import React, { ButtonHTMLAttributes } from 'react'

export const ListPackagesFound = ({results, listPackages, dispatchPackages}: {results: any[], listPackages: any[], dispatchPackages: any}) => {
    const addPackages = (e: React.MouseEvent<HTMLElement>) => {
        dispatchPackages({type : 'ADD', payload: e.currentTarget.dataset.name})
    }

    return (
        <ul>
            {results.map((ele) => (
                <li 
                    key={ele.name} 
                    className="text-blue-700 border-1 bg-blue-50 transition duration-200
                    flex items-center justify-start h-9"
                >
                    <button 
                        data-name={ele.name}
                        className="px-1 h-full border-none bg-blue-100 hover:bg-blue-200 transition duration-200"
                        onClick={addPackages}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="black">
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <div className="text-center w-full overflow-ellipsis">
                        <a className="overflow-ellipsis" href={ele.links.npm}>{ele.name}</a>
                    </div>
                </li>
            ))}
        </ul>
    )
}
