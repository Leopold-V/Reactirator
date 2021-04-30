import React from 'react'
import { ipcRenderer } from 'electron';
import toast from 'react-hot-toast';

import { toastValidationStyle } from '../helpers/toast';
import validateInput from '../utils/validate_input';

export const ButtonCreation = ({loading, input} : {loading: boolean, input: any}) => {

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!validateInput(input.appname)) {
            toast('The project name is invalid !', toastValidationStyle);
        } else {
            ipcRenderer.send('open-directory', input); 
        }
    };

    return (
        <button
            onClick={handleSubmit}
            className="w-30 mx-auto shadow-red bg-red-500 px-4 py-3 outline-none font-bold text-xl
            tracking-wider text-white rounded-lg hover:bg-red-700 focus:outline-none transition duration-250"
            >
            Build
        </button>
    )
}
