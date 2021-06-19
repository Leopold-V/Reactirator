import React from 'react';
import { usePackageJson } from './context/PackageJsonProvider';

export const ResultLog = () => {
  const { packageJson } = usePackageJson();

  return (
    <div
      id="packagejson"
      className="p-6 rounded text-xs bg-blueGray h-big overflow-y-auto overflow-x-hidden text-yellow-300"
    >
      <h2 className="text-xl text-gray-200 text-center font-extrabold">package.json</h2>
      <pre>{JSON.stringify(packageJson, null, 2)}</pre>
    </div>
  );
};
