import React, { useReducer } from 'react'
import { depStateType } from '../../helpers/types';
import dependenciesReducer from '../../reducers/dependenciesReducer';
import { PackagesManager } from '../PackageManagerBlock';

const initialDeps: depStateType = {
    dependencies: [],
    devDependencies: [],
  };

export const PackagesPage = () => {
    const [listPackages, dispatch] = useReducer(dependenciesReducer, initialDeps);

    return (
        <div className="flex flex-col items-center space-y-4 w-full pt-8">
            <h1>Package page</h1>
            <PackagesManager listPackages={listPackages} dispatchPackages={dispatch} />
        </div>
    )
}
