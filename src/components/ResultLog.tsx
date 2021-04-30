import React, { useContext } from 'react'
import { PackageContext } from './context/PackageContext';


export const ResultLog = () => {

    const { packageJson } = useContext(PackageContext);

    return (
        <div className="mt-10 p-6 rounded bg-gray-800 h-big overflow-auto text-yellow-300 w-1/3">
            <pre>{JSON.stringify(packageJson, null, 2)}</pre>
        </div>
    )
}
