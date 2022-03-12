import { ipcRenderer } from 'electron';
import React, { useEffect, useReducer, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { killProcess } from '../../../utils/killProcess';
import { useModal } from '../../../hooks/useModal';
import taskReducer from '../../reducers/taskReducer';
import { Card } from '../../../common/Card';
import { TaskSwitch } from './TaskSwitch';
import { TaskModal } from './TaskModal';
import { TaskStatut } from './TaskStatut';
import { errorTask, finishTask, stopTask } from '../../../slices/taskSlice';

// TODO:
// We should rather manage a list of process on the front so that we don't need a listener for process kill
// and we can use the list of process in a state for other work such as ask confirmation to leave the tasks page and kill all process.
// Create a new pid list state and update it each time we start a new task.
export const TasksItem = ({ taskName }: { taskName: string }) => {
  const [open, toggleModal] = useModal();
  const [log, setLog] = useState('');
  const [saveLog, setSaveLog] = useState('');
  const [taskRun, dispatchTask] = useReducer(taskReducer, { enabled: false, taskState: 'Idle', isKill: false });

  //@ts-ignore
  const task = useSelector((state) => state.task)
  const dispatch = useDispatch()

  useEffect(() => {
    ipcRenderer.on(`child-process-${taskName}`, (event, arg) => {
      if (!open) {
        setLog((log) => log + arg.toString());
      } else {
        setLog(log + saveLog);
      }
    });
    ipcRenderer.on(`child-process-error-${taskName}`, () => {
      dispatchTask({ type: 'ERROR' });
      dispatch(errorTask());
    });
    ipcRenderer.on(`child-process-end-${taskName}`, () => {
      dispatchTask({ type: 'FINISH' });
      dispatch(finishTask());
    });
    ipcRenderer.on(`child-process-kill-${taskName}`, async (event, arg) => {
      console.log(arg);
      try {
        await killProcess(arg);
        setLog((log) => log + 'Task aborted.');
      } catch (error) {
        console.log(error.message);
      } finally {
        dispatchTask({ type: 'STOP' });
        dispatch(stopTask());
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
    console.log(task);
  }, [task])
  

  useEffect(() => {
    if (!taskRun.enabled && taskRun.taskState === 'Pending') {
      ipcRenderer.send('kill-process', { task: taskName });
    }
  }, [taskRun.enabled]);

  return (
    <Card>
      <div className="flex justify-between items-center h-full">
        <div className="w-1/4 text-left font-bold text-gray-700 hover:opacity-90 transition duration-250">
          {taskName}
        </div>
        <div className="w-1/4 text-gray-500">
          <TaskStatut taskState={taskRun.taskState} />
        </div>
        <div className="w-1/4">
          <button
            onClick={toggleModal}
            className="px-3 py-1 rounded-full text-gray-600 text-sm bg-transparent border-2 border-indigo-400 hover:opacity-80 transition duration-200"
          >
            Open logs
          </button>
        </div>
        <TaskSwitch taskName={taskName} enabled={taskRun.enabled} dispatchTask={dispatchTask} />
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
