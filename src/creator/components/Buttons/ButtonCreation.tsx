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
      className="mx-auto px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Create
    </button>
  );
};