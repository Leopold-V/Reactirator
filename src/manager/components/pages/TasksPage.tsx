import React from 'react';
import { TasksList } from '../TasksBlock/TasksList';
import { TasksDevelopmentPane } from '../TasksBlock/TasksDevelopmentPane';

export const TasksPage = () => {
  return (
    <>
      <h1 className="pb-2 text-lg text-gray-700 font-bold">Tasks:</h1>
      <div className="space-y-4">
        <TasksDevelopmentPane
        />
        <TasksList  />
      </div>
    </>
  );
};
