import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { Layout } from '../common/Layout';
import { useProjectData } from './components/Contexts/ProjectDataProvider';
import { LoadingTasksProvider } from './components/Contexts/LoadingTasksProvider';
import { ArchitectureManagerPage } from './components/pages/ArchitectureManagerPage';
import { DependenciesPage } from './components/pages/DependenciesPage';
import { TasksPage } from './components/pages/TasksPage';

// TODO: Should kill all running process and ask for confirmation if we leave the manager application

const Manager = ({ theme, setTheme }: { theme: string; setTheme: (theme: string) => void }) => {
  const { projectData } = useProjectData();
  const { path } = useRouteMatch();

  return (
    <Layout theme={theme} setTheme={setTheme}>
      <div className="space-y-4 w-full h-full relative">
        <div className="text-center text-2xl font-extrabold">{projectData.name}</div>
        <hr />
        <LoadingTasksProvider>
          <Route exact path={`${path}`} render={() => <TasksPage />} />
          <Route exact path={`${path}/dependencies`} component={DependenciesPage} />
          <Route exact path={`${path}/architecture`} component={ArchitectureManagerPage} />
        </LoadingTasksProvider>
      </div>
    </Layout>
  );
};

export default Manager;
