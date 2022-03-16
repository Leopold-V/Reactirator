import React, { Dispatch } from 'react';

import { actionPackageType, depStateType } from '../../helpers/types';
import { LoadingPackageProvider } from '../Contexts/LoadingPackageProvider';

import { SearchPackages } from './SearchPackages';
import { ListPackages } from './ListPackages';
//import { PackagesSizeMemoized } from '../PackageCharts';
//import { usePackageJson } from '../Contexts/PackageJsonProvider';

export const PackagesManager = ({
  listPackages,
  dispatchPackages,
}: {
  listPackages: depStateType;
  dispatchPackages: Dispatch<actionPackageType>;
}) => {
  //const { baseSize } = usePackageJson();
  return (
    <LoadingPackageProvider>
      <div className="flex space-x-8">
        <div className="flex flex-col justify-center space-y-8 w-full">
          <SearchPackages dispatchPackages={dispatchPackages} />
          <ListPackages dispatchPackages={dispatchPackages} listPackages={listPackages} />
        </div>
        {/* <PackagesSizeMemoized listPackages={listPackages} baseSize={baseSize} /> */}
      </div>
    </LoadingPackageProvider>
  );
};
