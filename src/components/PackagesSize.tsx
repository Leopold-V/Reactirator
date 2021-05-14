import React, { useState, useContext, useEffect } from 'react';
import { calculateAllPackagesSize } from '../utils/calculateSize';
import listDepsSize from '../utils/listDepsSize';
import { depStateType } from '../helpers/types';
import { PackageContext } from './context/PackageProvider';
import { ChartSize } from './Chart';

export const PackagesSize = ({ listPackages }: { listPackages: depStateType }) => {
  const { packageJson } = useContext(PackageContext);

  const [totalSize, setTotalSize] = useState(0);
  const [newDepsSize, setNewDepsSize] = useState(0);
  const [loading, setLoading] = useState(false);

  const getSize = async () => {
    setLoading(true);
    const totalSize = await calculateAllPackagesSize(packageJson.dependencies);
    setTotalSize(totalSize);
    // To modify for include the custom package added like bootstrap
    setNewDepsSize(listDepsSize(listPackages.dependencies));
    setLoading(false);
  };

  useEffect(() => {
    getSize();
  }, [packageJson]);

  return (
    <div className="bg-white rounded shadow p-6 flex flex-col justify-start items-center h-72">
      <h3 className="font-bold">Unpacked size stats :</h3>
      {loading ? (
        <div className="my-10">loading...</div>
      ) : (
        <ChartSize totalSize={Math.floor(totalSize / 1000)} newDepsSize={newDepsSize} />
      )}
    </div>
  );
};
