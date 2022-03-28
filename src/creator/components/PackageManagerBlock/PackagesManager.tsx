import React, { Dispatch } from 'react';

import { actionPackageType, depStateType } from '../../helpers/types';
import { LoadingPackageProvider } from '../Contexts/LoadingPackageProvider';

import { SearchPackages } from './SearchPackages';
import { ListPackages } from './ListPackages';

export const PackagesManager = ({
  listPackages,
  dispatchPackages,
}: {
  listPackages: depStateType;
  dispatchPackages: Dispatch<actionPackageType>;
}) => {
  return (
    <LoadingPackageProvider>
      <div className="flex flex-col justify-center items-center space-y-8 w-2/3">
        <SearchPackages dispatchPackages={dispatchPackages} />
        <ListPackages dispatchPackages={dispatchPackages} listPackages={listPackages} />
      </div>
    </LoadingPackageProvider>
  );
};
