import React from 'react';
import { TasksItem } from './TasksItem';

export const TasksList = ({
  scripts,
}: {
  scripts: string[];
}) => {
  return (
    <ul className="h-72 flex flex-col space-y-2 overflow-y-auto">
      {Object.entries(scripts)
        .filter((ele) => ele[0] !== 'start' && ele[0] !== 'dev')
        .map((ele, i) => (
          <TasksItem key={i} task={ele[0]} />
        ))}
    </ul>
  );
};