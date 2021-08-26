import React, { useReducer } from 'react'
import { depStateType, formInputType } from '../../helpers/types';
import dependenciesReducer from '../../reducers/dependenciesReducer';
import { FormCustomProject } from '../CustomPackageBlock';
import { PackagesManager } from '../PackageManagerBlock';

const initialDeps: depStateType = {
    dependencies: [],
    devDependencies: [],
  };

export const PackagesPage = ({ input, setInput }: { input: formInputType, setInput: (input: formInputType) => void}) => {
    const [listPackages, dispatch] = useReducer(dependenciesReducer, initialDeps);

    return (
        <div className="flex flex-col w-full space-x-8">
            <div className="flex flex-col space-y-8">
                <FormCustomProject input={input} setInput={setInput} dispatchPackages={dispatch} />
                <PackagesManager listPackages={listPackages} dispatchPackages={dispatch} />
            </div>
        </div>
    )
}
