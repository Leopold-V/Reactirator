import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { OverviewPage } from './components/pages/OverviewPage';

const Manager = ({ theme, setTheme }: { theme: string; setTheme: (theme: string) => void }) => {
  const { path } = useRouteMatch();

  return (
    <div
      id="layout"
      className="relative bg-gray-50 dark:bg-primary overflow-y-auto flex items-center justify-center h-screen"
    >
      <Route exact path={path} component={OverviewPage} />
    </div>
  );
};

export default Manager;
