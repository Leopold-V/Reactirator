import React, { ReactNode, useContext } from 'react';
import { actionJsonType } from '../../helpers/types';

type PackageContextType = {
  packageJson: any;
  dispatchJson: (object: actionJsonType) => void;
  baseSize: number;
} | null;

export const PackageContext = React.createContext<PackageContextType>(null);

export const PackageJsonProvider = ({
  children,
  packageJson,
  dispatchJson,
  baseSize,
}: {
  children: ReactNode;
  packageJson: any;
  dispatchJson: (object: actionJsonType) => void;
  baseSize: number;
}) => {
  return (
    <PackageContext.Provider value={{ packageJson, dispatchJson, baseSize }}>
      {children}
    </PackageContext.Provider>
  );
};

export const usePackageJson = () => {
  return useContext(PackageContext);
};
