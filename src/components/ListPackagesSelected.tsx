import React from 'react'

export const ListPackagesSelected = ({listPackages, dispatchPackages}: {listPackages: any[], dispatchPackages: any}) => {
    const removePackages = (e: React.MouseEvent<HTMLElement>) => {
        dispatchPackages({type : 'REMOVE', payload: e.currentTarget.dataset.name})
    }

    return (
        <ul>
            {listPackages.map((ele) => (
                <li 
                    key={ele} 
                    className="text-red-700 border-1 bg-red-50 transition duration-200
                    flex items-center justify-start h-9"
                >
                    <button 
                        data-name={ele}
                        className="px-1 h-full border-none bg-red-100 hover:bg-red-200 transition duration-200"
                        onClick={removePackages}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="black">
                        <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    </button>
                    <div className="text-center w-full overflow-ellipsis">
                       {ele}
                    </div>
                </li>
            ))}
        </ul>
    )
}
