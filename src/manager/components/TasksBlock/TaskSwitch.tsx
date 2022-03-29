import { ipcRenderer } from 'electron';
import React, { useCallback, useEffect } from 'react';
import detect from 'detect-port';
import { Switch } from '@headlessui/react';
import throttle from 'lodash.throttle';

import { pendingTask, switchTask, updateLogs } from '../../../slices/taskSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';

export const TaskSwitch = ({
  taskName,
  enabled,
  taskState,
}: {
  taskName: string;
  enabled: boolean;
  taskState: string;
}) => {
  const projectPath = useAppSelector((state) => state.project.projectPath);
  const dispatch = useAppDispatch();

  const debouncedSwitch = useCallback(
    throttle(() => dispatch(switchTask(taskName)), 1000),
    []
  );

  const handleChange = () => {
    debouncedSwitch();
  };

  useEffect(() => {
    if (enabled && taskState !== 'Pending') {
      ipcRenderer.send('run-cmd', { path: projectPath, taskName: taskName });
      dispatch(pendingTask(taskName));
    }
  }, [enabled]);

  return (
    <Switch
      checked={enabled}
      onChange={handleChange}
      className={`${
        enabled ? 'bg-blue-600' : 'bg-gray-300'
      } relative inline-flex items-center h-6 border-2 border-transparent rounded-full w-11`}
    >
      <span className="sr-only">Run</span>
      <span
        aria-hidden="true"
        className={`${
          enabled ? 'translate-x-5' : 'translate-x-0'
        } pointer-events-none inline-block w-5 h-5 transform bg-white shadow rounded-full transition ease-in-out duration-200`}
      />
    </Switch>
  );
};

const port = 3000;
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const TaskMainSwitch = ({ taskName }: { taskName: string }) => {
  const projectPath = useAppSelector((state) => state.project.projectPath);
  const task = useAppSelector((state) => state.tasks.tasks[taskName]);
  const dispatch = useAppDispatch();

  const debouncedSwitch = useCallback(
    throttle(() => dispatch(switchTask(taskName)), 1000),
    []
  );

  const handleChange = () => {
    debouncedSwitch();
  };

  useEffect(() => {
    if (task.enabled && task.taskState !== 'Pending') {
      detect(port)
        .then((_port) => {
          if (port == _port) {
            ipcRenderer.send('run-cmd', { path: projectPath, taskName: taskName });
            dispatch(pendingTask(taskName));
          } else {
            dispatch(
              updateLogs({ taskName: taskName, logs: '\n\nThe port 3000 is busy. Task aborted.' })
            );
            dispatch(switchTask(taskName));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [task.enabled]);

  useEffect(() => {
    if (!task.enabled && task.taskState === 'Pending') {
      ipcRenderer.send('kill-process', { taskName: taskName });
    }
  }, [task.enabled, task.taskState]);

  return (
    <Switch
      checked={task.enabled}
      onChange={handleChange}
      className={classNames(
        task.enabled ? 'bg-green-400' : 'bg-gray-300',
        'relative inline-flex flex-shrink-0 h-6 w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none'
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        className={classNames(
          task.enabled ? 'translate-x-6' : 'translate-x-0',
          'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
        )}
      >
        <span
          className={classNames(
            task.enabled ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200',
            'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
            <path
              d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span
          className={classNames(
            task.enabled ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100',
            'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <svg className="h-3 w-3 text-green-400" fill="currentColor" viewBox="0 0 12 12">
            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
          </svg>
        </span>
      </span>
    </Switch>
  );
};
