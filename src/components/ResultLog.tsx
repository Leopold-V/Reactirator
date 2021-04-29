import React, { useEffect } from 'react'

export const ResultLog = ({packageJson, setPackageJson}: {packageJson: any, setPackageJson: any}) => {

    useEffect(() => {
        console.log(packageJson);
    }, [packageJson]);

    return (
        <div className="mt-10 p-6 rounded bg-gray-800 h-big overflow-auto text-yellow-300 w-1/3">
            <pre>{JSON.stringify(packageJson, null, 2)}</pre>
        </div>
    )
}
