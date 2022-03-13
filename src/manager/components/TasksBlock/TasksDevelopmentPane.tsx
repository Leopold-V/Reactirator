import React, { useState } from 'react';
import { useAppSelector } from '../../../hooks';
import { Card } from '../../../common/Card';
import { TerminalOutput } from '../Terminal';
import { TaskMainSwitch } from './TaskSwitch';

export const TasksDevelopmentPane = ({
  isRunning,
  setisRunning,
}: {
  isRunning: boolean;
  setisRunning: (running: boolean) => void;
}) => {
  const [log, setLog] = useState('');
  const project = useAppSelector(
    (state) => state.project);
    console.log(project);
  const startScript = useAppSelector(
    (state) => Object.entries(state.project.tasks).find((ele) => ele[0] === 'start' || ele[0] === 'dev')[0]
    );

  return (
    <Card>
      <div className="flex h-52 text-center">
        <div className="w-5/12 flex flex-col justify-center space-y-3">
          <h2 className="text-black font-bold text-lg">Development server</h2>
          <div className="justify-self-center">
            <TaskMainSwitch
              taskName={startScript}
              setLog={setLog}
              isRunning={isRunning}
              setisRunning={setisRunning}
            />
          </div>
        </div>
        <TerminalOutput taskName={startScript} log={log} />
      </div>
    </Card>
  );
};
