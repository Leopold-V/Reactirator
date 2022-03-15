import React from 'react';
import { useAppSelector } from '../../../hooks';

export const DependenciesPage = () => {
  const project = useAppSelector((state) => state.project);
  console.log(project);

  return (
    <div className="space-y-2">
      <h2 className="font-bold">Dependencies:</h2>
      <ul>
        {Object.entries(project.dependencies).map((ele) => (
          <li>
            {ele[0]}: {ele[1]}
          </li>
        ))}
      </ul>
      <h2 className="font-bold">Dev dependencies:</h2>
      <ul>
        {Object.entries(project.devDependencies).map((ele) => (
          <li>
            {ele[0]}: {ele[1]}
          </li>
        ))}
      </ul>
    </div>
  );
};
