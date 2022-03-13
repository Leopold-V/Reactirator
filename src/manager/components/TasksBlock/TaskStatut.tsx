import React from 'react';
import { BadgeCheckIcon, CogIcon, ExclamationIcon } from '@heroicons/react/outline';

export const TaskStatut = ({ taskState }: { taskState: string }) => {
  if (taskState === 'Idle') {
    return <div>Idle</div>;
  } else if (taskState === 'Error') {
    return (
      <div className="flex items-center space-x-1">
        <ExclamationIcon className="h-5 w-5 text-red-600" aria-hidden="true" />
        <span>Error</span>
      </div>
    );
  } else if (taskState === 'Success') {
    return (
      <div className="flex items-center space-x-1">
        <BadgeCheckIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
        <span>Success</span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center space-x-1">
        <div className="animate-spin">
          <CogIcon className="h-5 w-5 text-gray-500 " aria-hidden="true" />
        </div>
        <span>Pending...</span>
      </div>
    );
  }
};
