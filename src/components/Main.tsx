import React, { useState } from 'react'
import { Form } from './Form';
import { ConsoleLogs } from './ConsoleLogs';

export const Main = () => {

    const [loading, setLoading] = useState(false);

    return (
        <div className="flex justify-between items-center w-11/12">
            <div className="bg-gray-50 text-gray-800 px-8 lg:w-1/3 rounded flex flex-col items-center">
                <Form loading={loading} setLoading={setLoading} />
            </div>
            <div className="text-7xl">&#10140;</div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-settings" width="150" height="150" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            </div>
            <div className="text-7xl">&#10140;</div>
            <div className="bg-black rounded overflow-auto h-96 lg:w-1/3">
                <ConsoleLogs />
            </div>
        </div>
    )
}
