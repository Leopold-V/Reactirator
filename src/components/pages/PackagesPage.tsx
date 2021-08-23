import React, { useReducer } from 'react'
import { depStateType } from '../../helpers/types';
import dependenciesReducer from '../../reducers/dependenciesReducer';
import { usePackageJson } from '../Contexts/PackageJsonProvider';
import { PackagesSizeMemoized } from '../PackageCharts';
import { PackagesManager } from '../PackageManagerBlock';

const initialDeps: depStateType = {
    dependencies: [],
    devDependencies: [],
  };

export const PackagesPage = () => {
    const { baseSize } = usePackageJson();
    const [listPackages, dispatch] = useReducer(dependenciesReducer, initialDeps);

    return (
        <div className="flex flex-col flex-grow items-center space-y-4">
            <h1>Package page</h1>
            <PackagesManager listPackages={listPackages} dispatchPackages={dispatch} />
            <PackagesSizeMemoized listPackages={listPackages} baseSize={baseSize} />
        </div>
    )
}
