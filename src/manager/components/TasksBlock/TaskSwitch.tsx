import { ipcRenderer } from 'electron';
import React, { Dispatch, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import detect from 'detect-port';
import './switch.css';
import { Switch } from '@headlessui/react';
import { killProcess } from '../../../utils/killProcess';
import { actionTaskType } from '../../helpers/types';
import { useProjectData } from '../Contexts/ProjectDataProvider';
import { pendingTask } from '../../../slices/taskSlice';

export const TaskSwitch = ({
  taskName,
  enabled,
  dispatchTask,
}: {
  taskName: string;
  enabled: boolean;
  dispatchTask: Dispatch<actionTaskType>;
}) => {
  const { projectData } = useProjectData();
    //@ts-ignore
  const task = useSelector((state) => state.task)
  const dispatch = useDispatch()

  // TODO:
  // Since toggle switch change a lot of state and interaction with the server we should maybe add a debounce hook.
  const handleChange = () => {
    dispatchTask({ type: 'SWITCH' });
  };

  useEffect(() => {
    if (enabled) {
      ipcRenderer.send('run-cmd', { path: projectData.projectPath, cmd: taskName });
      dispatchTask({ type: 'PENDING' });
      dispatch(pendingTask());
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
  );
};

const port = 3000;

export const TaskMainSwitch = ({
  taskName,
  setLog,
  isRunning,
  setisRunning,
}: {
  taskName: string;
  setLog: (log: string) => void;
  isRunning: boolean;
  setisRunning: (running: boolean) => void;
}) => {
  const { projectData } = useProjectData();
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    ipcRenderer.on(`child-process-kill-${taskName}`, async (event, arg) => {
      try {
        await killProcess(arg);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLog('Task aborted');
        setisRunning(false);
      }
    });
    return () => {
      ipcRenderer.removeAllListeners(`child-process-kill-${taskName}`);
    };
  }, []);

  useEffect(() => {
    if (checked) {
      detect(port)
        .then((_port) => {
          if (port == _port) {
            ipcRenderer.send('run-cmd', { path: projectData.projectPath, cmd: taskName });
            setLog('');
            setisRunning(true);
          } else {
            setLog('The port 3000 is busy');
            setisRunning(false);
            setChecked(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [checked]);

  useEffect(() => {
    if (!checked && isRunning === true) {
      ipcRenderer.send('kill-process', { task: taskName });
    }
  }, [checked, isRunning]);

  return (
    <div>
      <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
        <input
          type="checkbox"
          name={`toggle-${taskName}`}
          id={`toggle-${taskName}`}
          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          checked={checked}
          onChange={handleChange}
        />
        <label
          htmlFor={`toggle-${taskName}`}
          className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
        ></label>
      </div>
      <label htmlFor={`toggle-${taskName}`} className="text-gray-700">
        Launch!
      </label>
    </div>
  );
};
