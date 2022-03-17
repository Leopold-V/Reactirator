import React from 'react';

import { useAppDispatch } from '../../../hooks';

import { SearchPackages } from '../../../creator/components/PackageManagerBlock';
import { DependenciesList, DependencySelectedCard } from '../DependenciesBlock';

export const DependenciesPage = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="space-y-2">
      <SearchPackages dispatchPackages={dispatch} />
      <h2 className="font-bold py-2">Dependencies:</h2>
      <div className="flex space-x-8">
        <div className="w-5/12 bg-white shadow rounded overflow-hidden">
          <DependenciesList />
        </div>
        <DependencySelectedCard />
      </div>
    </div>
  );
};
