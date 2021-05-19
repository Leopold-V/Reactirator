import React, { Dispatch } from 'react';
import { actionPackageType } from '../helpers/types';
import { usePackageJson } from './context/PackageJsonProvider';
import { ButtonAddPackage } from './ButtonAddPackage';

export const ItemPackageFound = ({
  title,
  version,
  dispatchPackages,
}: {
  title: string;
  version: string;
  dispatchPackages: Dispatch<actionPackageType>;
}) => {
  const { packageJson } = usePackageJson();

  return (
    <li key={title} className="flex items-center justify-center w-full h-9 overflow-hidden">
      {Object.keys(packageJson.dependencies).includes(title) ||
      Object.keys(packageJson.devDependencies).includes(title) ? (
        <div className="flex items-center justify-center text-sm font-semibold bg-gray-100 w-full h-full px-2">
          {title}
        </div>
      ) : (
        <ButtonAddPackage title={title} version={version} dispatchPackages={dispatchPackages} />
      )}
    </li>
  );
};
