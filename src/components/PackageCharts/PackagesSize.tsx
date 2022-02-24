import React, { useState, useEffect } from 'react';
import listDepsSize from '../../utils/listDepsSize';
import { depStateType } from '../../helpers/types';
import { ChartSize } from '../PackageCharts';

export const PackagesSize = ({
  listPackages,
  baseSize,
}: {
  listPackages: depStateType;
  baseSize: number;
}) => {
  const [depsSize, setDepsSize] = useState(0);
  const [devDepsSize, setDevDepsSize] = useState(0);

  useEffect(() => {
    setDepsSize(listDepsSize(listPackages.dependencies));
    setDevDepsSize(listDepsSize(listPackages.devDependencies));
  }, [listPackages]);

  return (
    <div className="w-full bg-white dark:bg-blueGray dark:text-white rounded shadow p-6 flex flex-col justify-start items-center hover:shadow-lg transition duration-200">
      <h3 className="font-bold pb-4">Install size (kb) :</h3>
      <ChartSize baseSize={baseSize} depsSize={depsSize} devDepsSize={devDepsSize} />
    </div>
  );
};

export const PackagesSizeMemoized = React.memo(PackagesSize);
