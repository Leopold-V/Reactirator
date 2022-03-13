import React from 'react';
import { useAppSelector } from '../../../hooks';
import { TasksItem } from './TasksItem';

export const TasksList = () => {
  const scripts = useAppSelector(
    (state) => state.project.tasks);

  return (
    <ul className="h-72 flex flex-col space-y-2 overflow-y-auto">
      {Object.keys(scripts)
        .filter((ele) => ele !== 'start' && ele !== 'dev')
        .map((ele, i) => (
          <TasksItem key={i} taskName={ele} />
        ))}
    </ul>
  );
};
