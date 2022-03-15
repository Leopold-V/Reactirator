import React from 'react';
import { useAppSelector } from '../../../hooks';
import { Card } from '../../../common/Card';
import { TerminalOutput } from '../Terminal';
import { TaskMainSwitch } from './TaskSwitch';

export const TasksDevelopmentPane = () => {
  const startScript = useAppSelector(
    (state) => Object.entries(state.project.tasks).find((ele) => ele[0] === 'start' || ele[0] === 'dev')[0]
    );

  return (
    <Card>
      <div className="flex h-52">
        <div className="w-5/12 flex flex-col justify-center items-center space-y-3">
          <h2 className="text-black font-bold text-lg">Development server</h2>
          <div className="justify-self-center">
            <TaskMainSwitch
              taskName={startScript}
            />
          </div>
        </div>
        <div className="w-7/12">
          <TerminalOutput taskName={startScript} />
        </div>
      </div>
    </Card>
  );
};
