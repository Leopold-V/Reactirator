import React, { useEffect } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import { useAppDispatch, useAppSelector } from '../hooks';
import { killProcess } from '../utils/killProcess';
import { stopTask, errorTask, finishTask, updateLogs } from '../slices/projectSlice';

import { ArchitectureManagerPage } from './components/pages/ArchitectureManagerPage';
import { DependenciesPage } from './components/pages/DependenciesPage';
import { TasksPage } from './components/pages/TasksPage';
import { Layout } from '../common/Layout';

// TODO:
// Should kill all running process and ask for confirmation if we leave the manager application
const Manager = ({ theme, setTheme }: { theme: string; setTheme: (theme: string) => void }) => {
  const { path } = useRouteMatch();
  const projectName = useAppSelector((state) => state.project.projectName);
  // TODO:
  // It implicitly means the selected project should ALWAYS have a script called "start" OR "dev" to launch the project.
  const taskStart = useAppSelector((state) => state.project.tasks['start' || 'dev']);
  const dispatch = useAppDispatch();

  useEffect(() => {
    ipcRenderer.on(`task-running`, (event, arg) => {
      dispatch(updateLogs({ taskName: arg.taskName, logs: arg.data.toString() }));
    });
    ipcRenderer.on(`task-running-error`, (event, arg) => {
      dispatch(errorTask({ taskName: arg.taskName, logs: arg.data }));
    });
    ipcRenderer.on(`task-running-exit`, (event, arg) => {
      dispatch(finishTask(arg.taskName));
    });
    ipcRenderer.on(`task-running-kill`, async (event, arg) => {
      try {
        await killProcess(arg.pid);
      } catch (error) {
        console.log(error.message);
      } finally {
        dispatch(stopTask(arg.taskName));
      }
    });
    return () => {
      ipcRenderer.removeAllListeners(`task-running`);
      ipcRenderer.removeAllListeners(`task-running-error`);
      ipcRenderer.removeAllListeners(`task-running-exit`);
      ipcRenderer.removeAllListeners(`task-running-kill`);
      ipcRenderer.send('kill-all-running-process');
    };
  }, []);

  return (
    <Layout theme={theme} setTheme={setTheme}>
      <div className="space-y-4 w-full h-full relative">
        <div className="flex items-center justify-center space-x-3">
          <span className="text-center text-2xl font-extrabold">{projectName}</span>
          <span
            className={`${taskStart.taskState === 'Pending' ? 'bg-green-100' : 'bg-gray-100'}
              h-4 w-4 mt-1 rounded-full flex items-center justify-center`}
            aria-hidden="true"
          >
            <span className={`${taskStart.taskState === 'Pending' ? 'bg-green-400' : 'bg-gray-400'} h-2 w-2 rounded-full`} />
          </span>
        </div>
        <hr />
        <Route exact path={`${path}`} render={() => <TasksPage />} />
        <Route exact path={`${path}/dependencies`} component={DependenciesPage} />
        <Route exact path={`${path}/architecture`} component={ArchitectureManagerPage} />
      </div>
    </Layout>
  );
};

export default Manager;
