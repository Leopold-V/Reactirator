import React, { useState } from 'react'
import { Form } from './Form';
import { ConsoleLogs } from './ConsoleLogs';
import { Toaster } from 'react-hot-toast';

export const Main = () => {

    const [loading, setLoading] = useState(false);

    return (
        <div className="pt-8 flex justify-between items-center flex-wrap w-11/12">
            <Toaster position="top-center" />
            <div className="bg-gray-50 text-gray-800 px-8 lg:w-1/3 rounded mx-auto">
                <Form loading={loading} setLoading={setLoading} />
            </div>
            <div className={`text-7xl hidden lg:block ${loading ? 'animate-arrow-bounce' : ''}`}>&#10140;</div>
            <div className="flex-col justify-start items-center hidden lg:flex">
                <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-settings ${loading ? 'animate-spin-slow' : ''}`} width="150" height="150" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            </div>
            <div className={`text-7xl hidden lg:block ${loading ? 'animate-arrow-bounce' : ''}`}>&#10140;</div>
            <div className="bg-black rounded overflow-auto mx-auto h-96 mt-20 lg:mt-0 lg:w-1/3">
                <ConsoleLogs />
            </div>
        </div>
    )
}
