import React, { useState, useReducer } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import initialState from './helpers/initialState';
import initialStructure from './helpers/initialStructure';
import structureReducer from './reducers/structureReducer';

import { PackagesPage } from './components/pages/PackagesPage';
import { CommandPage } from './components/pages/CommandPage';
import { DocumentationPage } from './components/pages/DocumentationPage';
import { ArchitecturePage } from './components/pages/ArchitecturePage';
import { DetailsPage } from './components/pages/DetailsPage';
import { FeaturesPage } from './components/pages/FeaturesPage';
import { LayoutCreator } from './components/LayoutCreator';

const Creator = () => {
  const [input, setInput] = useState(initialState);
  const [readme, setReadme] = useState('');
  const [structure, dispatch] = useReducer(
    structureReducer,
    JSON.parse(JSON.stringify(initialStructure))
  );

  const { path } = useRouteMatch();

  return (
    <LayoutCreator>
      <Route
        exact
        path={path}
        render={() => (
          <DetailsPage input={input} setInput={setInput} />
        )}
      />
      <Route
        exact
        path={`${path}/features`}
        render={() => <FeaturesPage input={input} setInput={setInput} />}
      />
      <Route
        exact
        path={`${path}/packages`}
        render={() => <PackagesPage />}
      />
      <Route
        exact
        path={`${path}/documentation`}
        render={() => <DocumentationPage readme={readme} setReadme={setReadme} />}
      />
      {/* <Route
        exact
        path={`${path}/architecture`}
        render={() => <ArchitecturePage structure={structure} dispatch={dispatch} />}
      /> */}
      <Route
        exact
        path={`${path}/components`}
        render={() => <ArchitecturePage structure={structure} dispatch={dispatch} />}
      />
      <Route exact path={`${path}/command`} component={CommandPage} />
    </LayoutCreator>
  );
};

export default Creator;
