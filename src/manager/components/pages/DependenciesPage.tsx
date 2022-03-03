import React from 'react';
import { useProjectData } from '../Contexts/ProjectDataProvider';

export const DependenciesPage = () => {
  const { projectData } = useProjectData();
  console.log(projectData);

  return (
    <div className="space-y-2">
      <h2 className="font-bold">Dependencies:</h2>
      <ul>
        {Object.entries(projectData.dependencies).map((ele) => (
          <li>
            {ele[0]}: {ele[1]}
          </li>
        ))}
      </ul>
      <h2 className="font-bold">Dev dependencies:</h2>
      <ul>
        {Object.entries(projectData.devDependencies).map((ele) => (
          <li>
            {ele[0]}: {ele[1]}
          </li>
        ))}
      </ul>
    </div>
  );
};
