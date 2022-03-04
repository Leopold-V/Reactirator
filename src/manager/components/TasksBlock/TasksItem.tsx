import React, { useEffect, useState } from 'react';
import { useModal } from '../../../hooks/useModal';
import { Card } from '../../../common/Card';
import { TaskSwitch } from './TaskSwitch';
import { TaskModal } from './TaskModal';
import { ipcRenderer } from 'electron';

export const TasksItem = ({
  task,
}: {
  task: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [open, toggleModal] = useModal();
  const [log, setLog] = useState('');
  const [saveLog, setSaveLog] = useState('');

  useEffect(() => {
    ipcRenderer.on(`child-process-${task}`, (event, arg) => {
      if (!open) {
        setLog((log) => log + arg.toString());
      } else {
        setLog(log + saveLog);
      }
    })
  }, []);

  return (
    <Card>
      <div className="flex justify-between items-center h-full">
        <div className="w-1/4 text-left font-bold text-gray-700 hover:opacity-90 transition duration-250">
          {task}
        </div>
        <div className="w-1/4 text-gray-500">{loading ? 'Running...' : 'Idle'}</div>
        <div className="w-1/4">
          <button onClick={toggleModal} className="px-3 py-1 rounded-full text-gray-600 text-sm bg-transparent border-2 border-indigo-400 hover:opacity-80 transition duration-200">
            Open logs
          </button>
          </div>
        <TaskSwitch task={task} setLog={setLog} />
      </div>
      <TaskModal task={task} log={log} open={open} toggleModal={toggleModal} setSaveLog={setSaveLog} />
    </Card>
  );
};
