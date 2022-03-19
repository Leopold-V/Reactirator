import React, { useState, useReducer } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import initialState from './helpers/initialState';
import initialStructure from './helpers/initialStructure';
import structureReducer from './reducers/structureReducer';
import { PackagesPage } from './components/pages/PackagesPage';
import { OverviewPage } from './components/pages/OverviewPage';
import { CommandPage } from './components/pages/CommandPage';
import { DocumentationPage } from './components/pages/DocumentationPage';
import { ArchitecturePage } from './components/pages/ArchitecturePage';
import { Layout } from '../common/Layout';

const Creator = ({ theme, setTheme }: { theme: string; setTheme: (theme: string) => void }) => {
  const [input, setInput] = useState(initialState);
  const [readme, setReadme] = useState('');
  const [structure, dispatch] = useReducer(
    structureReducer,
    JSON.parse(JSON.stringify(initialStructure))
  );

  const { path } = useRouteMatch();

  return (
    <Layout theme={theme} setTheme={setTheme}>
      <Route
        exact
        path={path}
        render={() => (
          <OverviewPage structure={structure} input={input} setInput={setInput} readme={readme} />
        )}
      />
      <Route
        exact
        path={`${path}/packages`}
        render={() => <PackagesPage input={input} setInput={setInput} />}
      />
      <Route
        exact
        path={`${path}/documentation`}
        render={() => <DocumentationPage readme={readme} setReadme={setReadme} />}
      />
      <Route
        exact
        path={`${path}/architecture`}
        render={() => <ArchitecturePage structure={structure} dispatch={dispatch} />}
      />
      <Route exact path={`${path}/command`} component={CommandPage} />
    </Layout>
  );
};

export default Creator;
