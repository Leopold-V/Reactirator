import React from 'react';

export const HeaderManager = ({
  projectName,
  taskState,
}: {
  projectName: string;
  taskState: string;
}) => {
  return (
    <div className="flex items-center relative justify-center space-x-3">
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
