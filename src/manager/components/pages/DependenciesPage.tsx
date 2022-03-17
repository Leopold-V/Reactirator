import React from 'react';
import { SearchPackages } from '../../../creator/components/PackageManagerBlock';
import { useAppDispatch } from '../../../hooks';
import { DependenciesList } from '../DependenciesBlock';

export const DependenciesPage = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="space-y-2">
      <SearchPackages dispatchPackages={dispatch} />
      <h2 className="font-bold py-2">Dependencies:</h2>
      <div className="w-1/2 bg-white shadow rounded overflow-hidden">
        <DependenciesList />
      </div>
    </div>
  );
};
