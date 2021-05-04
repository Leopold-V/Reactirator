import React, { Dispatch } from 'react';

import { actionPackageType, depStateType } from '../helpers/types';

import { ListPackagesSelected } from './ListPackagesSelected';


export const ListPackages = (
    {listPackages, dispatchPackages}:
    {listPackages: depStateType, dispatchPackages: Dispatch<actionPackageType>}) => {
    return (
        <div className="mx-10 w-full lg:w-3/5 flex flex-wrap justify-center lg:space-x-6">
            <div className="p-6 flex-grow bg-white text-gray-800 rounded shadow">
                <div className="flex flex-col items-center">
                    <h2 className="font-bold">Dependencies</h2>
                    <ListPackagesSelected dispatchPackages={dispatchPackages} listPackages={listPackages.dependencies} />
                </div>
            </div>
            <div className="p-6 flex-grow bg-white text-gray-800 rounded shadow">
                <div className="flex flex-col items-center">
                    <h2 className="font-bold">Dev dependencies</h2>
                    <ListPackagesSelected dispatchPackages={dispatchPackages} listPackages={listPackages.devDependencies} />
                </div>
            </div>
        </div>
    )
}
