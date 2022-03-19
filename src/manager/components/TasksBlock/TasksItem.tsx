import { ipcRenderer } from 'electron';
import React, { useEffect } from 'react';
import { useAppSelector } from '../../../hooks';
import { useModal } from '../../../hooks/useModal';

import { Card } from '../../../common/Card';
import { TaskSwitch } from './TaskSwitch';
import { TaskModal } from './TaskModal';
import { TaskStatut } from './TaskStatut';

export const TasksItem = ({ taskName }: { taskName: string }) => {
  const [open, toggleModal] = useModal();
  const task = useAppSelector((state) => state.tasks.tasks[taskName]);

  useEffect(() => {
    if (!task.enabled && task.taskState === 'Pending') {
      ipcRenderer.send('kill-process', { taskName: taskName });
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
      <TaskModal taskName={taskName} open={open} toggleModal={toggleModal} />
    </Card>
  );
};
