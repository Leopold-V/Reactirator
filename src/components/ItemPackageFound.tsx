import React, { Dispatch, Ref } from 'react';
import { actionPackageType, packageFoundType } from '../helpers/types';
import { usePackageJson } from './context/PackageJsonProvider';
import { ButtonAddPackage } from './ButtonAddPackage';

export const ItemPackageFound = ({
  packageData,
  dispatchPackages,
  setIsShown,
  setData,
}: {
  packageData: packageFoundType;
  dispatchPackages: Dispatch<actionPackageType>;
  setIsShown: (isShown: boolean) => void;
  setData:  (data: packageFoundType) => void;
  ref: Ref<any>
}) => {
  const { packageJson } = usePackageJson();

  const handleMouseEnter = () => {
    setData(packageData);
    setIsShown(true);
  };

  const handleMouseLeave = () => {
    setIsShown(false);
  };

  return (
    <li key={packageData.name} className="flex items-center justify-center w-full h-9 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {Object.keys(packageJson.dependencies).includes(packageData.name) ||
      Object.keys(packageJson.devDependencies).includes(packageData.name) ? (
        <div className="flex items-center justify-center text-sm font-semibold bg-gray-100 w-full h-full px-2">
          {packageData.name}
        </div>
      ) : (
        <ButtonAddPackage packageData={packageData} dispatchPackages={dispatchPackages} />
      )}
    </li>
  );
};
