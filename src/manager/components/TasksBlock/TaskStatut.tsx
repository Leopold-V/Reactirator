import React from 'react';
import { BadgeCheckIcon, CogIcon, ExclamationIcon } from '@heroicons/react/outline';
import { taskStateType } from '../../helpers/types';

const displayStateIcon = (taskState: string) => {
  switch (taskState) {
    case 'Success':
      return <BadgeCheckIcon className="h-5 w-5 text-green-500" aria-hidden="true" />;
    case 'Error':
      return <ExclamationIcon className="h-5 w-5 text-red-600" aria-hidden="true" />;
    case 'Pending':
      return <CogIcon className="h-5 w-5 animate-spin text-gray-500 " aria-hidden="true" />;
  }
};

const statusText: Record<string, string> = {
  Success: 'Success',
  Error: 'Error',
  Pending: 'Pending...',
};

export const TaskStatut = ({ taskState }: { taskState: taskStateType }) => {
  if (taskState === 'Idle') {
    return <div>Idle</div>;
  } else {
    return (
      <div className="flex items-center space-x-1">
        {displayStateIcon(taskState)}
        <span>{statusText[taskState]}</span>
      </div>
    );
  }
};
