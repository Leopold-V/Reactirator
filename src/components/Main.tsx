import React from 'react'
import { Form } from './Form';
import { ConsoleLogs } from './ConsoleLogs';

export const Main = () => {
    return (
        <div className="bg-gray-50 text-gray-800 py-6 px-8 lg:w-1/3 rounded flex flex-col items-center">
            <Form />
            <ConsoleLogs />
        </div>
    )
}
