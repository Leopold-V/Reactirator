import React, { ReactNode, useContext } from 'react';
import { actionJsonType } from '../../helpers/types';

type PackageContextType = {
  packageJson: any;
  dispatchJson: (object: actionJsonType) => void;
} | null;

export const PackageContext = React.createContext<PackageContextType>(null);

export const PackageJsonProvider = ({
  children,
  packageJson,
  dispatchJson,
}: {
  children: ReactNode;
  packageJson: any;
  dispatchJson: (object: actionJsonType) => void;
}) => {
  return (
    <PackageContext.Provider value={{ packageJson, dispatchJson }}>
      {children}
    </PackageContext.Provider>
  );
};

export const usePackageJson = () => {
  return useContext(PackageContext);
};
