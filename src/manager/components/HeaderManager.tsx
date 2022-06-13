import React from 'react';

import { useAppSelector } from '../../hooks';

export const HeaderManager = ({
  projectName,
  taskState,
}: {
  projectName: string;
  taskState: string;
}) => {
  const starterName = useAppSelector((state) => state.project.starter);

  const pathToLogo = (starterName: string) => {
    if (starterName === 'CRA') {
      return '../assets/logo_starter/cra.svg';
    }
    if (starterName === 'next') {
      return '../assets/logo_starter/nextjs.svg';
    }
    if (starterName === 'gatsby') {
      return '../assets/logo_starter/gatsby.png';
    }
    if (starterName === 'remix') {
      return '../assets/logo_starter/remix.svg';
    }
    if (starterName === 'vite') {
      return '../assets/logo_starter/vite.svg';
    }
  };

  return (
    <div className="flex items-center relative justify-center space-x-3">
      {starterName !== '' && (
        <img className="w-8 h-8" src={pathToLogo(starterName)} alt="logo_starter" />
      )}
      <span className="text-center text-2xl font-extrabold">{projectName}</span>
      <div className="relative">
        <span className="flex items-center justify-center h-3 w-3 absolute">
          <span
            className={`${taskState === 'Pending' ? 'bg-green-400 animate-ping' : 'bg-gray-100'}
        absolute inline-flex h-full w-full rounded-full`}
            aria-hidden="true"
          />
          <span
            className={`${
              taskState === 'Pending' ? 'bg-green-400 ' : 'bg-gray-400'
            } relative inline-flex rounded-full h-2 w-2`}
          />
        </span>
      </div>
    </div>
  );
};
