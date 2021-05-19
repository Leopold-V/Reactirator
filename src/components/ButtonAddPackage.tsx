import React, { Dispatch } from 'react';

import { actionPackageType } from '../helpers/types';
import { calculatePackageSize } from '../utils/calculateSize';
import { usePackageJson } from './context/PackageJsonProvider';

export const ButtonAddPackage = ({
  title,
  version,
  dispatchPackages,
}: {
  title: string;
  version: string;
  dispatchPackages: Dispatch<actionPackageType>;
}) => {
  const { dispatchJson } = usePackageJson();

  const addPackages = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
    const target = e.target as HTMLElement;
    const size = await calculatePackageSize(target.dataset.name, target.dataset.version);
    dispatchPackages({
      type: 'ADD',
      payload: {
        destination: 'dependencies',
        name: target.dataset.name,
        size: size,
      },
    });
    dispatchJson({
      type: 'ADD',
      payload: {
        category: 'dependencies',
        name: target.dataset.name,
        version: target.dataset.version,
      },
    });
  };

  return (
    <button
      className="flex items-center justify-center text-sm font-semibold bg-white hover:bg-blue-100 transition duration-200
            w-full h-full px-2 cursor-pointer"
      data-name={title}
      data-version={version}
      onClick={addPackages}
    >
      {title}
    </button>
  );
};
