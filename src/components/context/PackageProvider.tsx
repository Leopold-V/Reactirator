import React, { ReactNode, useReducer, useEffect } from 'react';
import initialPackageJson from '../../helpers/initialPackageJson';
import jsonPackageReducer from '../../reducers/jsonPackageReducer';
import { actionJsonType } from '../../helpers/types';
import { calculateAllPackagesSize } from '../../utils/calculateDepsSize';

type PackageContextType = {
    packageJson: any,
    dispatchJson: (object: actionJsonType) => void
} | null;

export const PackageContext = React.createContext<PackageContextType>(null);

const PackageProvider = ({children}: {children: ReactNode}) => {

    const [packageJson, dispatchJson] = useReducer(jsonPackageReducer, initialPackageJson);

    useEffect(() => {
        calculateAllPackagesSize(packageJson.dependencies);
    }, [])

    return (
        <PackageContext.Provider value={{packageJson, dispatchJson}}> 
            {children}
        </PackageContext.Provider>
    )
}

export default PackageProvider;
