import React, { useState } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { Layout } from '../common/Layout';
import { useProjectData } from './components/Contexts/ProjectDataProvider';
import { LoadingTasksProvider } from './components/Contexts/LoadingTasksProvider';
import { ArchitectureManagerPage } from './components/pages/ArchitectureManagerPage';
import { DependenciesPage } from './components/pages/DependenciesPage';
import { TasksPage } from './components/pages/TasksPage';
import { TerminalOutput } from './components/Terminal';

const Manager = ({ theme, setTheme }: { theme: string; setTheme: (theme: string) => void }) => {
  const [cmd, setCmd] = useState('');
  const { projectData } = useProjectData();
  const { path } = useRouteMatch();

  return (
    <Layout theme={theme} setTheme={setTheme}>
      <div className="space-y-4 w-full h-full relative">
        <div className="text-center text-2xl font-extrabold">{projectData.name}</div>
        <hr />
        <LoadingTasksProvider>
          <Route exact path={`${path}`} render={() => <TasksPage setCmd={setCmd} />} />
          <Route exact path={`${path}/dependencies`} component={DependenciesPage} />
          <Route exact path={`${path}/architecture`} component={ArchitectureManagerPage} />
          <TerminalOutput cmd={cmd} />
        </LoadingTasksProvider>
      </div>
    </Layout>
  );
};

export default Manager;
