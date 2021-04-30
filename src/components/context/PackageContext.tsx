import React, { ReactNode, useReducer } from 'react';
import initialPackageJson from '../../helpers/initialPackageJson';
import packageReducer from '../../reducers/packageReducer';

export const PackageContext = React.createContext<any | null>(null);

const PackageProvider = ({children}: {children: ReactNode}) => {

    const [packageJson, dispatch] = useReducer(packageReducer, initialPackageJson) // a changer

    return (
        <PackageContext.Provider value={{packageJson, dispatch}}> 
            {children}
        </PackageContext.Provider>
    )
}

export default PackageProvider;
