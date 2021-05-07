import React from 'react'
import toast from 'react-hot-toast';
import { ipcRenderer, remote } from 'electron';
const { dialog } = remote;

import { toastValidationStyle } from '../helpers/toast';
import validateInput from '../utils/validate_input';
import { formInputType } from '../helpers/types';

const dialogOptions = {
    type: 'question',
    buttons: ['Yes', "No"],
    defaultId: 1,
    cancelId: 1,
    title: 'Are you sure ?',
    message:
      'The installation process is about to begin.',
    detail:
      "It might take a couple of minutes after you choose your project location.",
};

export const ButtonCreation = ({input} : {input: formInputType}) => {

    //const win = remote.getCurrentWindow();

    const dialogCallback = (response: number): void => {
        const isConfirmed = response === 0;
        if (isConfirmed) {
            if (!validateInput(input.appname)) {
                toast('The project name is invalid !', toastValidationStyle);
            } else {
            ipcRenderer.send('open-directory', input); 
            }
        }
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();
        const result = await dialog.showMessageBox(dialogOptions);
        dialogCallback(result.response);
    };

    return (
        <button
            onClick={handleSubmit}
            className=" mx-auto shadow-red bg-red-500 px-4 py-2 outline-none font-bold text-xl
            tracking-wider text-white rounded-lg hover:bg-red-700 focus:outline-none transition duration-250"
            >
            Create
        </button>
    )
}
