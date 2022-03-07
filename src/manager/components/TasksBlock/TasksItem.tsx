import { ipcRenderer } from 'electron';
import React, { useEffect, useState } from 'react';
import { killProcess } from '../../../utils/killProcess';
import { taskStateType } from '../../helpers/types';
import { useModal } from '../../../hooks/useModal';
import { Card } from '../../../common/Card';
import { TaskSwitch } from './TaskSwitch';
import { TaskModal } from './TaskModal';
import { TaskStatut } from './TaskStatut';

export const TasksItem = ({ task }: { task: string }) => {
  // TODO: Its quite a lot of UI states, maybe simpler to have a reducer to manager all.
  const [open, toggleModal] = useModal();
  const [log, setLog] = useState('');
  const [saveLog, setSaveLog] = useState('');
  const [enabled, setEnabled] = useState(false);
  const [taskState, setTaskState] = useState<taskStateType>('Idle');

  useEffect(() => {
    ipcRenderer.on(`child-process-${task}`, (event, arg) => {
      if (!open) {
        setLog((log) => log + arg.toString());
      } else {
        setLog(log + saveLog);
      }
    });
    ipcRenderer.on(`child-process-error-${task}`, () => {
      setTaskState('Error');
    });
    ipcRenderer.on(`child-process-end-${task}`, () => {
      setTaskState('Success');
    });
    /*
    ipcRenderer.on(`child-process-close-${task}`, () => {
      setTaskState('Error');
    });*/
    ipcRenderer.on(`child-process-kill-${task}`, async (event, arg) => {
      console.log(arg);
      try {
        await killProcess(arg);
        setTaskState('Error');
      } catch (error) {
        console.log(error.message);
        setTaskState('Error');
      }
    });
    return () => {
      ipcRenderer.removeAllListeners(`child-process-${task}`);
      ipcRenderer.removeAllListeners(`child-process-error-${task}`);
      ipcRenderer.removeAllListeners(`child-process-end-${task}`);
      ipcRenderer.removeAllListeners(`child-process-kill-${task}`);
    };
  }, []);

  useEffect(() => {
    if (taskState !== 'Pending') {
      setEnabled(false);
    }
  }, [taskState]);

  useEffect(() => {
    if (!enabled && taskState === 'Pending') {
      ipcRenderer.send('kill-process', { task: task });
    }
    if (enabled) {
      setTaskState('Pending');
    }
  }, [enabled]);

  return (
    <Card>
      <div className="flex justify-between items-center h-full">
        <div className="w-1/4 text-left font-bold text-gray-700 hover:opacity-90 transition duration-250">
          {task}
        </div>
        <div className="w-1/4 text-gray-500">
          <TaskStatut taskState={taskState} />
        </div>
        <div className="w-1/4">
          <button
            onClick={toggleModal}
            className="px-3 py-1 rounded-full text-gray-600 text-sm bg-transparent border-2 border-indigo-400 hover:opacity-80 transition duration-200"
          >
            Open logs
          </button>
        </div>
        <TaskSwitch task={task} enabled={enabled} setEnabled={setEnabled} />
      </div>
      <TaskModal
        task={task}
        log={log}
        open={open}
        toggleModal={toggleModal}
        setSaveLog={setSaveLog}
      />
    </Card>
  );
};
