import React, { useContext } from 'react'
import { PackageContext } from './context/PackageContext';


export const ResultLog = () => {

    const { packageJson } = useContext(PackageContext);

    return (
        <div className="p-6 rounded text-xs bg-gray-800 h-big overflow-y-auto overflow-x-auto text-yellow-300">
            <h2 className="text-xl text-gray-200 text-center font-extrabold">package.json</h2>
            <pre>{JSON.stringify(packageJson, null, 2)}</pre>
        </div>
    )
}
