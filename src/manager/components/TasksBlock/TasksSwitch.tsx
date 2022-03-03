import React, { MouseEvent, useEffect, useState } from 'react';
import './switch.css';

export const TasksSwitch = ({ task, setCmd }: { task: string; setCmd: (cmd: string) => void }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    if (checked) {
      setCmd(task);
    }
  }, [checked]);

  return (
    <div>
      <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
        <input
          type="checkbox"
          name={`toggle-${task}`}
          id={`toggle-${task}`}
          className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"
          checked={checked}
          onChange={handleChange}
        />
        <label
          htmlFor={`toggle-${task}`}
          className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"
        ></label>
      </div>
      <label htmlFor={`toggle-${task}`} className="text-xs text-gray-700">
        Run
      </label>
    </div>
  );
};

export const TasksMainSwitch = ({
  task,
  setCmd,
}: {
  task: string;
  setCmd: (cmd: string) => void;
}) => {
  const runTask = (e: MouseEvent<HTMLButtonElement>) => {
    setCmd(task);
  };

  return (
    <div>
      <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
        <input
          type="checkbox"
          name={`toggle-${task}`}
          id={`toggle-${task}`}
          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        />
        <label
          htmlFor={`toggle-${task}`}
          className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
        ></label>
      </div>
      <label htmlFor={`toggle-${task}`} className="text-gray-700">
        Launch!
      </label>
    </div>
  );
};
