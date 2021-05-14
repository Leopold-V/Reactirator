import React, { useContext } from 'react';
import { PackageContext } from './context/PackageProvider';

export const ResultLog = () => {
  const { packageJson } = useContext(PackageContext);

  return (
    <div className="p-6 rounded text-xs bg-blueGray h-big overflow-y-auto overflow-x-auto text-yellow-300">
      <h2 className="text-xl text-gray-200 text-center font-extrabold">package.json</h2>
      <pre>{JSON.stringify(packageJson, null, 2)}</pre>
    </div>
  );
};
