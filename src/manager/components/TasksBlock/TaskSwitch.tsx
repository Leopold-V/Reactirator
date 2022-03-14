import { ipcRenderer } from 'electron';
import React, { useEffect } from 'react';
import detect from 'detect-port';
import { Switch } from '@headlessui/react';
import { killProcess } from '../../../utils/killProcess';
import { pendingTask, stopTask, switchTask, updateLogs } from '../../../slices/projectSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import './switch.css';

export const TaskSwitch = ({ taskName, enabled, taskState }: { taskName: string; enabled: boolean, taskState: string }) => {
  const projectPath = useAppSelector((state) => state.project.projectPath);
  const dispatch = useAppDispatch();
  // TODO:
  // Since toggle switch change a lot of state and interaction with the server we should maybe add a debounce hook.
  const handleChange = () => {
    dispatch(switchTask(taskName));
  };

  useEffect(() => {
    if (enabled && taskState !== 'Pending') {
      ipcRenderer.send('run-cmd', { path: projectPath, cmd: taskName });
      dispatch(pendingTask(taskName));
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

export const TaskMainSwitch = ({ taskName, setLog }: { taskName: string, setLog: (log: string) => void }) => {
  const projectPath = useAppSelector((state) => state.project.projectPath);
  const task = useAppSelector((state) => state.project.tasks[taskName]);
  const dispatch = useAppDispatch();

  const handleChange = () => {
    dispatch(switchTask(taskName));
  };

  useEffect(() => {
    ipcRenderer.on(`child-process-kill-${taskName}`, async (event, arg) => {
      try {
        await killProcess(arg);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLog('Task aborted');
        dispatch(stopTask(taskName));
      }
    });
    return () => {
      ipcRenderer.removeAllListeners(`child-process-kill-${taskName}`);
    };
  }, []);

  useEffect(() => {
    if (task.enabled) {
      detect(port)
        .then((_port) => {
          if (port == _port) {
            ipcRenderer.send('run-cmd', { path: projectPath, cmd: taskName });
            dispatch(pendingTask(taskName));
          } else {
            dispatch(updateLogs({taskName: taskName, logs: 'The port 3000 is busy'}));
            dispatch(stopTask(taskName));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [task.enabled]);

  useEffect(() => {
    if (!task.enabled && task.taskState === 'Pending') {
      ipcRenderer.send('kill-process', { task: taskName });
    }
  }, [task.enabled, task.taskState]);

  return (
    <div>
      <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
        <input
          type="checkbox"
          name={`toggle-${taskName}`}
          id={`toggle-${taskName}`}
          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          checked={task.enabled}
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
