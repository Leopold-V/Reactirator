import React from 'react';
import { usePackageJson } from '../Contexts/PackageJsonProvider';
//import './packagejson.css';

export const CardPackageJson = () => {
  const { packageJson } = usePackageJson();

  return (
    <div
      id="packagejson"
      className="p-4 rounded text-xs bg-blueGray h-80 overflow-y-auto overflow-x-hidden shadow hover:shadow-lg transition duration-200 text-yellow-300"
    >
      <pre data-testid="packagejson">{JSON.stringify(packageJson, null, 2)}</pre>
    </div>
  );
};
