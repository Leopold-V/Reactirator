import React, { useEffect, useState } from 'react';
import detect from 'detect-port';
import { Route, useRouteMatch } from 'react-router-dom';
import { Layout } from '../common/Layout';
import { useProjectData } from './components/Contexts/ProjectDataProvider';
import { LoadingTasksProvider } from './components/Contexts/LoadingTasksProvider';
import { ArchitectureManagerPage } from './components/pages/ArchitectureManagerPage';
import { DependenciesPage } from './components/pages/DependenciesPage';
import { TasksPage } from './components/pages/TasksPage';

// TODO:
// Should kill all running process and ask for confirmation if we leave the manager application

// TODO:
// Refactor state from manager children component tree to use a context and persist task/server state across the different pages.
const Manager = ({ theme, setTheme }: { theme: string; setTheme: (theme: string) => void }) => {
  const { projectData } = useProjectData();
  const { path } = useRouteMatch();
  const [isRunning, setisRunning] = useState(false);

  return (
    <Layout theme={theme} setTheme={setTheme}>
      <div className="space-y-4 w-full h-full relative">
        <div className="text-center text-2xl font-extrabold">{projectData.name} {isRunning ? '[RUNNING]' : '[OFF]'}</div>
        <hr />
        <LoadingTasksProvider>
          <Route exact path={`${path}`} render={() => <TasksPage isRunning={isRunning} setisRunning={setisRunning} />} />
          <Route exact path={`${path}/dependencies`} component={DependenciesPage} />
          <Route exact path={`${path}/architecture`} component={ArchitectureManagerPage} />
        </LoadingTasksProvider>
      </div>
    </Layout>
  );
};

export default Manager;
