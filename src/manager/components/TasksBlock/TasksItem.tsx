import { ipcRenderer } from 'electron';
import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { killProcess } from '../../../utils/killProcess';
import { errorTask, finishTask, stopTask, updateLogs } from '../../../slices/projectSlice';
import { useModal } from '../../../hooks/useModal';

import { Card } from '../../../common/Card';
import { TaskSwitch } from './TaskSwitch';
import { TaskModal } from './TaskModal';
import { TaskStatut } from './TaskStatut';

// TODO:
// We should rather manage a list of process on the front so that we don't need a listener for process kill
// and we can use the list of process in a state for other work such as ask confirmation to leave the tasks page and kill all process.
// Create a new pid list state and update it each time we start a new task.
export const TasksItem = ({ taskName }: { taskName: string }) => {
  const [open, toggleModal] = useModal();
  const [log, setLog] = useState('');
  const [saveLog, setSaveLog] = useState('');

  const task = useAppSelector((state) => state.project.tasks[taskName]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    ipcRenderer.on(`child-process-${taskName}`, (event, arg) => {
      if (!open) {
        setLog((log) => log + arg.toString());
        dispatch(updateLogs({ taskName: taskName, logs: arg.toString()}));
      } else {
        setLog(log + saveLog);
      }
    });
    ipcRenderer.on(`child-process-error-${taskName}`, () => {
      //TODO:
      //Error should result in an error status, maybe add a new state to act like isKill ?
      dispatch(errorTask(taskName));
    });
    ipcRenderer.on(`child-process-end-${taskName}`, () => {
      dispatch(finishTask(taskName));
    });
    ipcRenderer.on(`child-process-kill-${taskName}`, async (event, arg) => {
      try {
        await killProcess(arg);
        dispatch(updateLogs({taskName: taskName, logs: 'Task aborted.'}));
      } catch (error) {
        console.log(error.message);
      } finally {
        dispatch(stopTask(taskName));
      }
    });
    return () => {
      ipcRenderer.removeAllListeners(`child-process-${taskName}`);
      ipcRenderer.removeAllListeners(`child-process-error-${taskName}`);
      ipcRenderer.removeAllListeners(`child-process-end-${taskName}`);
      ipcRenderer.removeAllListeners(`child-process-kill-${taskName}`);
    };
  }, []);

  useEffect(() => {
    if (!task.enabled && task.taskState === 'Pending') {
      ipcRenderer.send('kill-process', { task: taskName });
    }
  }, [task.enabled]);

  return (
    <Card>
      <div className="flex justify-between items-center h-full">
        <div className="w-1/4 text-left font-bold text-gray-700 hover:opacity-90 transition duration-250">
          {taskName}
        </div>
        <div className="w-1/4 text-gray-500">
          <TaskStatut taskState={task.taskState} />
        </div>
        <div className="w-1/4">
          <button
            onClick={toggleModal}
            className="px-3 py-1 rounded-full text-gray-600 text-sm bg-transparent border-2 border-indigo-400 hover:opacity-80 transition duration-200"
          >
            Open logs
          </button>
        </div>
        <TaskSwitch taskName={taskName} enabled={task.enabled} taskState={task.taskState} />
      </div>
      <TaskModal
        taskName={taskName}
        log={log}
        setLog={setLog}
        open={open}
        toggleModal={toggleModal}
        setSaveLog={setSaveLog}
      />
    </Card>
  );
};
