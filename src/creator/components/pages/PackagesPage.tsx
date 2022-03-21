import React from 'react';
import { useDependencies } from '../Contexts/dependenciesProvider';
import { PackagesManager } from '../PackageManagerBlock';

export const PackagesPage = () => {
  const { listPackages, dispatch } = useDependencies();

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col space-y-8">
        <PackagesManager listPackages={listPackages} dispatchPackages={dispatch} />
      </div>
    </div>
  );
};
