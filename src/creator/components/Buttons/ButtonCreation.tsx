import React from 'react';
import toast from 'react-hot-toast';
import { ipcRenderer } from 'electron';

import { toastValidationStyle } from '../../helpers/toast';
import { validateProjectName } from '../../../utils/validateInput';
import { formInputType } from '../../helpers/types';

export const ButtonCreation = ({ input }: { input: formInputType }) => {
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    if (!validateProjectName(input.appname)) {
      toast('The project name is invalid !', toastValidationStyle);
    } else {
      ipcRenderer.send('open-directory', input);
    }
  };

  return (
    <button
      onClick={handleSubmit}
      className=" mx-auto shadow-red bg-gray-900 opacity-100 px-4 py-2 outline-none font-bold
            tracking-wider text-white rounded-lg hover:opacity-90 focus:outline-none transition duration-250"
    >
      Create
    </button>
  );
};
