import React, { useState } from 'react';
import { Card } from '../../../common/Card';
import { TerminalOutput } from '../Terminal';
import { TaskMainSwitch } from './TaskSwitch';

export const TasksDevelopmentPane = ({
  startScript,
  isRunning,
  setisRunning,
}: {
  startScript: string;
  isRunning: boolean;
  setisRunning: (running: boolean) => void;
}) => {
  const [log, setLog] = useState('');

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
