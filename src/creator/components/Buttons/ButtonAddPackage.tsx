import React, { Dispatch } from 'react';

import { searchPackageInRegistry } from '../../../services/package.service';
import { actionPackageType, packageFoundType } from '../../helpers/types';
import { useLoading } from '../Contexts/LoadingPackageProvider';
import { usePackageJson } from '../Contexts/PackageJsonProvider';

export const ButtonAddPackage = ({
  packageData,
  dispatchPackages,
}: {
  packageData: packageFoundType;
  dispatchPackages: Dispatch<actionPackageType>;
}) => {
  const { loading, setLoading } = useLoading();
  const { dispatchJson } = usePackageJson();

  const addPackages = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
    const target = e.target as HTMLElement;
    setLoading(true);
    try {
      const packageRegistryInfo = await searchPackageInRegistry(
        target.dataset.name,
        target.dataset.version
      );
      dispatchPackages({
        type: 'ADD',
        payload: {
          destination: 'dependencies',
          name: target.dataset.name,
          size: packageRegistryInfo.dist.unpackedSize,
          version: target.dataset.version,
          dependencies: packageRegistryInfo.dependencies,
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
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <button
      className="flex items-center justify-center text-sm font-semibold bg-white hover:bg-blue-100 transition duration-200
            w-full h-full px-2 cursor-pointer"
      data-name={packageData.name}
      data-version={packageData.version}
      onClick={addPackages}
      disabled={loading}
    >
      {packageData.name}
    </button>
  );
};
