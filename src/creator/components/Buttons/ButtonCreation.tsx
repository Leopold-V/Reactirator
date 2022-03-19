import React from 'react';
import toast from 'react-hot-toast';
import { ipcRenderer } from 'electron';

import { toastValidationStyle } from '../../helpers/toast';
import { validateProjectName } from '../../../utils/validateInput';
import { formInputType } from '../../helpers/types';
import { Button } from '../../../common/Button';

export const ButtonCreation = ({ input }: { input: formInputType }) => {
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    if (!validateProjectName(input.appname)) {
      toast('The project name is invalid !', toastValidationStyle);
    } else {
      ipcRenderer.send('open-directory', input);
    }
  };

  return <Button onClick={handleSubmit}>Create</Button>;
};
