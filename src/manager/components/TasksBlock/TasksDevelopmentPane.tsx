import React from 'react';
import { useAppSelector } from '../../../hooks';
import { Card } from '../../../common/Card';
import { TerminalOutput } from '../Terminal';
import { TaskMainSwitch } from './TaskSwitch';

export const TasksDevelopmentPane = () => {
  const startScript = useAppSelector(
    (state) =>
      Object.entries(state.tasks.tasks).find((ele) => ele[0] === 'start' || ele[0] === 'dev')[0]
  );

  return (
    <Card>
      <div className="flex h-52">
        <div className="w-5/12 flex flex-col justify-center items-center space-y-3 relative">
          <h2 className="text-black font-bold text-lg">Development server</h2>
          <div className="justify-self-center">
            <TaskMainSwitch taskName={startScript} />
          </div>
          <a id="open_project" className="flex items-center absolute bottom-4 space-x-1 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span className="text-sm text-gray-500">Open in browser</span>
          </a>
        </div>
        <div className="w-7/12">
          <TerminalOutput taskName={startScript} />
        </div>
      </div>
    </Card>
  );
};
