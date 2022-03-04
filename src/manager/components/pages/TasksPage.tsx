import React from 'react';
import { useProjectData } from '../Contexts/ProjectDataProvider';
import { TasksList } from '../TasksBlock/TasksList';
import { TasksDevelopmentPane } from '../TasksBlock/TasksDevelopmentPane';

export const TasksPage = () => {
  const { projectData } = useProjectData();

  const startScript = Object.entries(projectData.scripts).find(
    (ele) => ele[0] === 'start' || ele[0] === 'dev'
  )[0];

  return (
    <>
      <h1 className="pb-2 text-lg text-gray-700 font-bold">Tasks:</h1>
      <div className="space-y-4">
        <TasksDevelopmentPane startScript={startScript} />
        <TasksList scripts={projectData.scripts} />
      </div>
    </>
  );
};
