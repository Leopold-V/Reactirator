import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { Layout } from '../common/Layout';
import { ArchitectureManagerPage } from './components/pages/ArchitectureManagerPage';
import { DependenciesPage } from './components/pages/DependenciesPage';
import { TasksPage } from './components/pages/TasksPage';

const Manager = ({ theme, setTheme }: { theme: string; setTheme: (theme: string) => void }) => {
  const { path } = useRouteMatch();

  return (
    <Layout theme={theme} setTheme={setTheme}>
      <Route exact path={`${path}`} component={TasksPage} />
      <Route exact path={`${path}/dependencies`} component={DependenciesPage} />
      <Route exact path={`${path}/architecture`} component={ArchitectureManagerPage} />
    </Layout>
  );
};

export default Manager;