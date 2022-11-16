import React, { Dispatch } from 'react';
import { actionPackageType, packageFoundType } from '../../helpers/types';
import { usePackageJson } from '../Contexts/PackageJsonProvider';
import { dependencyFoundType } from '../../../manager/helpers/types';

type propsType = {
  packageData: packageFoundType;
  dispatchPackages: Dispatch<actionPackageType>;
  setDepData: (dep: dependencyFoundType) => void;
  toggleModal: () => void;
  dep: dependencyFoundType;
};

export const ItemPackageFound = (props: propsType) => {
  const { packageJson } = usePackageJson();

  const { packageData, dep, setDepData, toggleModal } = { ...props };

  const handleOpen = async () => {
    setDepData(dep);
    toggleModal();
  };

  return (
    <li
      key={packageData.name}
      className="flex items-center justify-center w-full h-9 relative"
      onClick={handleOpen}
    >
      {Object.keys(packageJson.dependencies).includes(packageData.name) ||
      Object.keys(packageJson.devDependencies).includes(packageData.name) ? (
        <div className="flex items-center justify-center text-sm font-semibold bg-gray-200 w-full h-full px-2">
          {packageData.name}
        </div>
      ) : (
        <div
        className="flex items-center justify-center text-sm font-semibold bg-white hover:bg-blue-100 transition duration-200
              w-full h-full px-2 cursor-pointer"
        >
        {packageData.name}
      </div>
      )}
    </li>
  );
};
