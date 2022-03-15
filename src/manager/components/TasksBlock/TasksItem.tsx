import { ipcRenderer } from 'electron';
import React, { useEffect } from 'react';
import { useAppSelector } from '../../../hooks';
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

  const task = useAppSelector((state) => state.project.tasks[taskName]);

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
      <TaskModal
        taskName={taskName}
        open={open}
        toggleModal={toggleModal}
      />
    </Card>
  );
};
