import React, { ReactNode, useContext, useEffect, useReducer, useState } from 'react';
import initialPackageJson from '../../helpers/initialPackageJson';
import jsonPackageReducer from '../../reducers/jsonPackageReducer';
import { actionJsonType } from '../../helpers/types';
import { calculateAllPackagesSize } from '../../utils/calculateSize';

type PackageContextType = {
  packageJson: any;
  dispatchJson: (object: actionJsonType) => void;
} | null;

export const PackageContext = React.createContext<PackageContextType>(null);

const PackageJsonProvider = ({ children }: { children: ReactNode }) => {
  const [packageJson, dispatchJson] = useReducer(jsonPackageReducer, initialPackageJson);

  return (
    <PackageContext.Provider value={{ packageJson, dispatchJson }}>
      {children}
    </PackageContext.Provider>
  );
};

export const usePackageJson = () => {
  const { packageJson, dispatchJson } = useContext(PackageContext);
  const [totalSize, setTotalSize] = useState(0);

  const initializeTotalSize = async (): Promise<void> => {
    // initial size with only CRA dependencies
    const totalSize = await calculateAllPackagesSize(packageJson.dependencies);
    const totalSizeInKb = Math.floor(totalSize / 1000);
    setTotalSize(totalSizeInKb);
  }

  useEffect(() => {
    initializeTotalSize();
  }, []);

  return { packageJson, dispatchJson, totalSize };

}

export default PackageJsonProvider;
