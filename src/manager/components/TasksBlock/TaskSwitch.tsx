import { ipcRenderer } from 'electron';
import React, { useEffect, useState } from 'react';
import './switch.css';
import { Switch } from '@headlessui/react';
import { useProjectData } from '../Contexts/ProjectDataProvider';

export const TaskSwitch = React.memo<{ task: string, enabled: boolean, setEnabled: (enabled: boolean) => void }>(({
    task,
    enabled,
    setEnabled
} ) => {
  const { projectData } = useProjectData();

  const handleChange = () => {
    setEnabled(!enabled);
  };
  
  useEffect(() => {
    if (enabled) {
      ipcRenderer.send('run-cmd', {path: projectData.projectPath, cmd: task});
    }
  }, [enabled]);

  return (
    <Switch
      checked={enabled}
      onChange={handleChange}
      className={`${
        enabled ? 'bg-blue-600' : 'bg-gray-300'
      } relative inline-flex items-center h-6 rounded-full w-11`}
    >
      <span className="sr-only">Run</span>
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block w-4 h-4 transform bg-white rounded-full transition ease-in-out duration-200`}
      />
    </Switch>
  )
})

export const TaskMainSwitch = ({
  task
}: {
  task: string;
}) => {
  const { projectData } = useProjectData();
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    if (checked) {
      ipcRenderer.send('run-cmd', {path: projectData.projectPath, cmd: task});
    }
  }, [checked]);

  return (
    <div>
      <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
        <input
          type="checkbox"
          name={`toggle-${task}`}
          id={`toggle-${task}`}
          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          checked={checked}
          onChange={handleChange}
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
