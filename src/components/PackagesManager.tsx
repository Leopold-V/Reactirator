import React, { Dispatch } from 'react'

import { actionPackageType, depStateType } from '../helpers/types';
import { SearchPackages } from './SearchPackages';
import { ListPackages } from './ListPackages';

export const PackagesManager = (
    {listPackages, dispatchPackages}:
    {listPackages: depStateType, dispatchPackages: Dispatch<actionPackageType>}) => {

    return (
        <div className="flex justify-center lg:justify-start flex-wrap items:center lg:items-start w-full">
            <SearchPackages dispatchPackages={dispatchPackages} />
            <ListPackages dispatchPackages={dispatchPackages} listPackages={listPackages} />
        </div>
    )
}
