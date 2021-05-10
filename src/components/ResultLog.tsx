import React, { useContext } from 'react'
import { PackageContext } from './context/PackageContext';


export const ResultLog = () => {

    const { packageJson } = useContext(PackageContext);

    return (
        <div className="p-6 w-full rounded text-xs bg-gray-800 overflow-x-auto text-yellow-300">
            <pre>{JSON.stringify(packageJson, null, 2)}</pre>
        </div>
    )
}
