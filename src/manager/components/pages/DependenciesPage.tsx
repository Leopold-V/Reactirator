import React from 'react';

import { DependenciesList, DependenciesSearch, DependencySelectedCard } from '../DependenciesBlock';

export const DependenciesPage = () => {
  return (
    <div className="space-y-2">
      <DependenciesSearch />
      <h2 className="font-bold py-2">Dependencies:</h2>
      <div className="flex space-x-8">
        <div className="w-5/12 bg-white shadow rounded overflow-hidden">
          <DependenciesList />
        </div>
        <div className="w-7/12 ">
          <DependencySelectedCard />
        </div>
      </div>
    </div>
  );
};
