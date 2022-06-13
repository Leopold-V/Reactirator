import React, { useEffect } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { ipcRenderer } from 'electron';

import { useAppDispatch, useAppSelector } from '../hooks';
import { killProcess } from '../utils/killProcess';
import findStartScript from '../utils/findStartScript';
import { stopTask, errorTask, finishTask, updateLogs } from '../slices/taskSlice';
import { removeDep, selectDep, updateDep } from '../slices/dependenciesSlice';

import { ComponentGeneratorPage } from './components/pages/ComponentGeneratorPage';
import { DependenciesPage } from './components/pages/DependenciesPage';
import { TasksPage } from './components/pages/TasksPage';
import { Layout } from '../common/Layout';
import { HeaderManager } from './components/HeaderManager';

const Manager = () => {
  const { path } = useRouteMatch();
  const projectName = useAppSelector((state) => state.project.projectName);
  const starter = useAppSelector((state) => state.project.starter);

  const taskState = useAppSelector(
    (state) => state.tasks.tasks[findStartScript(starter) || 'start' || 'dev'].taskState
  );
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
    ipcRenderer.on(
      'dep-install-exit',
      (event, arg: { depName: string; isDevDep: boolean; version: string }) => {
        console.log(arg.version);
        dispatch(
          updateDep({
            name: arg.depName,
            isDevDep: arg.isDevDep,
            version: arg.version,
            status: 'Idle',
          })
        );
        dispatch(
          selectDep({ depName: arg.depName, depVersion: arg.version, isDevDep: arg.isDevDep })
        );
      }
    );
    ipcRenderer.on('dep-uninstall-exit', (event, arg: { depName: string; isDevDep: boolean }) => {
      dispatch(removeDep({ depName: arg.depName, isDevDep: arg.isDevDep }));
    });
    ipcRenderer.on(
      'dep-update-exit',
      (event, arg: { depName: string; isDevDep: boolean; version: string }) => {
        dispatch(
          updateDep({
            name: arg.depName,
            isDevDep: arg.isDevDep,
            version: arg.version,
            status: 'Idle',
          })
        );
        dispatch(
          selectDep({ depName: arg.depName, depVersion: arg.version, isDevDep: arg.isDevDep })
        );
      }
    );

    return () => {
      ipcRenderer.removeAllListeners(`task-running`);
      ipcRenderer.removeAllListeners(`task-running-error`);
      ipcRenderer.removeAllListeners(`task-running-exit`);
      ipcRenderer.removeAllListeners(`task-running-kill`);
      ipcRenderer.removeAllListeners('dep-uninstall-exit');
      ipcRenderer.removeAllListeners('dep-install-exit');
      ipcRenderer.removeAllListeners('dep-update-exit');
      ipcRenderer.send('kill-all-running-process');
    };
  }, []);

  return (
    <Layout>
      <div className="space-y-4 w-full h-full">
        <HeaderManager projectName={projectName} taskState={taskState} />
        <hr />
        <Route exact path={`${path}`} render={() => <TasksPage />} />
        <Route exact path={`${path}/dependencies`} component={DependenciesPage} />
        <Route exact path={`${path}/component`} component={ComponentGeneratorPage} />
      </div>
    </Layout>
  );
};

export default Manager;
