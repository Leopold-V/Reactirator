import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { Layout } from '../common/Layout';
import { ArchitectureManagerPage } from './components/pages/ArchitectureManagerPage';
import { DependenciesPage } from './components/pages/DependenciesPage';
import { TasksPage } from './components/pages/TasksPage';
import { useAppSelector } from '../hooks';

// TODO:
// Should kill all running process and ask for confirmation if we leave the manager application
const Manager = ({ theme, setTheme }: { theme: string; setTheme: (theme: string) => void }) => {
  const projectName = useAppSelector(state => state.project.projectName);
  //TODO:
  //It implicitly means the selected project should ALWAYS have a script called "start" OR "dev" to launch the project.
  const taskStart = useAppSelector(
    (state) => state.project.tasks['start' || 'dev']);
  const { path } = useRouteMatch();

  return (
    <Layout theme={theme} setTheme={setTheme}>
      <div className="space-y-4 w-full h-full relative">
        <div className="text-center text-2xl font-extrabold">
          {projectName} {taskStart.taskState === 'Pending' ? '[RUNNING]' : '[OFF]'}
        </div>
        <hr />
          <Route
            exact
            path={`${path}`}
            render={() => <TasksPage />}
          />
          <Route exact path={`${path}/dependencies`} component={DependenciesPage} />
          <Route exact path={`${path}/architecture`} component={ArchitectureManagerPage} />
      </div>
    </Layout>
  );
};

export default Manager;
