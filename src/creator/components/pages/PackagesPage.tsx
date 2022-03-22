import React from 'react';

import { useDependencies } from '../Contexts/dependenciesProvider';

import { Title } from '../../../common/Typo';
import { PackagesManager } from '../PackageManagerBlock';

export const PackagesPage = () => {
  const { listPackages, dispatch } = useDependencies();

  return (
    <div className="flex flex-col items-center justify-center w-full space-y-2">
      <Title title="Add packages" />
      <PackagesManager listPackages={listPackages} dispatchPackages={dispatch} />
    </div>
  );
};
