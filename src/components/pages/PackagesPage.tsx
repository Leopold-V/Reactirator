import React, { useReducer } from 'react'
import { depStateType, formInputType } from '../../helpers/types';
import dependenciesReducer from '../../reducers/dependenciesReducer';
import { usePackageJson } from '../Contexts/PackageJsonProvider';
import { FormCustomProject } from '../CustomPackageBlock';
import { PackagesSizeMemoized } from '../PackageCharts';
import { PackagesManager } from '../PackageManagerBlock';

const initialDeps: depStateType = {
    dependencies: [],
    devDependencies: [],
  };

export const PackagesPage = ({ input, setInput }: { input: formInputType, setInput: (input: formInputType) => void}) => {
    const { baseSize } = usePackageJson();
    const [listPackages, dispatch] = useReducer(dependenciesReducer, initialDeps);

    return (
        <div className="flex justify-center w-full space-x-8">
            <div className="align-baseline flex-grow">
                <FormCustomProject input={input} setInput={setInput} dispatchPackages={dispatch} />
            </div>
            <div className="flex flex-col space-y-8">
                <PackagesSizeMemoized listPackages={listPackages} baseSize={baseSize} />
                <PackagesManager listPackages={listPackages} dispatchPackages={dispatch} />
            </div>
        </div>
    )
}
