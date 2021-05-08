import React from 'react'

export const CardDependencies = ({children, title, listPackages} : {children: React.ReactNode, title: string, listPackages: string[]}) => {
    return (
        <div className="p-6 w-64 bg-white text-gray-800 rounded shadow">
            <div className="flex flex-col items-center">
                <h2 className="font-bold pb-2">{title} ({listPackages.length}) :</h2>
                {children}
            </div>
        </div>
    )
}
