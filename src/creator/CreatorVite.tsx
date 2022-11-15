import React, { useState, useReducer } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import {initialStateVite} from './helpers/initialState';
import initialStructure from './helpers/initialStructure';
import structureReducer from './reducers/structureReducer';

import { PackagesPage } from './components/pages/PackagesPage';
import { ArchitecturePage } from './components/pages/ArchitecturePage';
import { DetailsPage } from './components/pages/DetailsPage';
import { FeaturesPage } from './components/pages/FeaturesPage';
import { LayoutCreator } from './components/LayoutCreator';
import { InstallationPage } from './components/pages/InstallationPage';
import { formInputType } from './helpers/types';

const CreatorVite = () => {
  const [input, setInput] = useState<formInputType>(initialStateVite);
  const [structure, dispatch] = useReducer(
    structureReducer,
    JSON.parse(JSON.stringify(initialStructure))
  );

  const { path } = useRouteMatch();

  return (
    <LayoutCreator starter="vite">
      <Route exact path={path} render={() => <DetailsPage input={input} setInput={setInput} />} />
      <Route
        exact
        path={`${path}/features`}
        render={() => <FeaturesPage input={input} setInput={setInput} starter="vite" />}
      />
      <Route exact path={`${path}/packages`} render={() => <PackagesPage />} />
      <Route
        exact
        path={`${path}/components`}
        render={() => <ArchitecturePage structure={structure} dispatch={dispatch} />}
      />
      <Route
        exact
        path={`${path}/installation`}
        render={() => <InstallationPage input={input} structure={structure} starter="vite" />}
      />
    </LayoutCreator>
  );
};

export default CreatorVite;
