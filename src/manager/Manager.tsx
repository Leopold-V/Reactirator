import React, { useEffect } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import { useAppDispatch, useAppSelector } from '../hooks';
import { killProcess } from '../utils/killProcess';
import { stopTask, errorTask, finishTask, updateLogs } from '../slices/taskSlice';

import { ArchitectureManagerPage } from './components/pages/ArchitectureManagerPage';
import { DependenciesPage } from './components/pages/DependenciesPage';
import { TasksPage } from './components/pages/TasksPage';
import { Layout } from '../common/Layout';
import { HeaderManager } from './components/HeaderManager';

const Manager = ({ theme, setTheme }: { theme: string; setTheme: (theme: string) => void }) => {
  const { path } = useRouteMatch();
  const projectName = useAppSelector((state) => state.project.projectName);
  // TODO:
  // It implicitly means the selected project should ALWAYS have a script called "start" OR "dev" to launch the project.
  const taskState = useAppSelector((state) => state.tasks.tasks['start' || 'dev'].taskState);
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
      <div className="space-y-4 w-full h-full">
       <HeaderManager projectName={projectName} taskState={taskState} />
        <hr />
        <Route exact path={`${path}`} render={() => <TasksPage />} />
        <Route exact path={`${path}/dependencies`} component={DependenciesPage} />
        <Route exact path={`${path}/architecture`} component={ArchitectureManagerPage} />
      </div>
    </Layout>
  );
};

export default Manager;
