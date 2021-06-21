import React, { ReactNode, useContext, useEffect, useReducer, useState } from 'react';
import initialPackageJson from '../../helpers/initialPackageJson';
import jsonPackageReducer from '../../reducers/jsonPackageReducer';
import { actionJsonType } from '../../helpers/types';
import { getSizeOfPackagesList, searchPackages } from '../../services/package.service';

type PackageContextType = {
  packageJson: any;
  dispatchJson: (object: actionJsonType) => void;
  baseSize: number;
} | null;

export const PackageContext = React.createContext<PackageContextType>(null);

const PackageJsonProvider = ({ children }: { children: ReactNode }) => {
  const [packageJson, dispatchJson] = useReducer(jsonPackageReducer, initialPackageJson);
  const [baseSize, setBaseSize] = useState(0);

  const getVersionsOfBaseDeps = async (): Promise<any[]> => {
    const list = [];
    for (const ele in packageJson.dependencies) {
      const res = await searchPackages(ele, 1);
      list.push(res[0]);
      dispatchJson({
        type: 'ADD',
        payload: {
          category: 'dependencies',
          name: res[0].package.name,
          version: res[0].package.version,
        },
      });
    }
    return list;
  };

  const initializeTotalSize = async (listPkg: any[]): Promise<void> => {
    // initial size with only CRA dependencies
    const totalSize = await getSizeOfPackagesList(listPkg);
    const totalSizeInKb = Math.floor(totalSize / 1000);
    setBaseSize(totalSizeInKb);
  };

  useEffect(() => {
    (async () => {
      const updatedDepsList = await getVersionsOfBaseDeps();
      await initializeTotalSize(updatedDepsList);
    })();
  }, []);

  return (
    <PackageContext.Provider value={{ packageJson, dispatchJson, baseSize }}>
      {children}
    </PackageContext.Provider>
  );
};

export const usePackageJson = () => {
  return useContext(PackageContext);
};

export default PackageJsonProvider;
