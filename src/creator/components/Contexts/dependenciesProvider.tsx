import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { depStateType } from '../../helpers/types';
import dependenciesReducer from '../../reducers/dependenciesReducer';

const dependenciesContext = createContext(null);

const initialDeps: depStateType = {
  dependencies: [],
  devDependencies: [],
};

export const DependenciesProvider = ({ children }: { children: ReactNode }) => {
  const [listPackages, dispatch] = useReducer(
    dependenciesReducer,
    JSON.parse(JSON.stringify(initialDeps))
  );

  return (
    <dependenciesContext.Provider value={{ listPackages, dispatch }}>
      {children}
    </dependenciesContext.Provider>
  );
};

export const useDependencies = () => {
  const { listPackages, dispatch } = useContext(dependenciesContext);

  return { listPackages, dispatch };
};
