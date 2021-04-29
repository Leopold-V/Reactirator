import React from 'react';

export const ListPackagesSelected = (
    {listPackages, dispatchPackages, packageJson, setPackageJson}:
    {listPackages: any[], dispatchPackages: any, packageJson: any, setPackageJson: any}) => {
    const removePackages = (e: React.MouseEvent<HTMLElement>) => {
        dispatchPackages({type : 'REMOVE', payload: e.currentTarget.dataset.name});
        delete packageJson.dependencies[e.currentTarget.dataset.name];
        setPackageJson({...packageJson});
    }

    return (
        <ul>
            {listPackages.map((ele) => (
                <li 
                    key={ele} 
                    className="text-red-700 border-1 bg-red-50 transition duration-200
                    flex items-center justify-start rounded shadow-md h-9 my-2 w-full"
                >
                    <button 
                        data-name={ele}
                        className="px-2 h-full border-none bg-red-100 hover:bg-red-200 transition duration-200"
                        onClick={removePackages}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#3f3f3f">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    </button>
                    <div className="text-center w-full overflow-ellipsis px-2">
                       {ele}
                    </div>
                </li>
            ))}
        </ul>
    )
}
