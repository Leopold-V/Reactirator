import { ipcRenderer } from 'electron';
import React, { useEffect, useState } from 'react';

import { formCompType } from '../../helpers/types';

import { ButtonOutline } from '../../../common/Button';
import { FormComponent } from '../ComponentGenBlock';

const initialInput: formCompType = {
  functionComponent: false,
};

export const ArchitectureManagerPage = () => {
  const [location, setLocation] = useState('');
  const [input, setInput] = useState(initialInput);
  const selectLocation = () => {
    ipcRenderer.send('open-directory', 'component');
  };

  useEffect(() => {
    ipcRenderer.on(
      'open-dialog-directory-selected-component',
      async (event: Electron.IpcRendererEvent, arg) => {
        const [filepath] = arg;
        setLocation(filepath[0]);
      }
    );
    return () => {
      ipcRenderer.removeAllListeners('open-dialog-directory-selected-component');
    };
  }, []);

  return (
    <div className="flex flex-col items-center space-y-6">
      <h1 className="text-lg text-gray-700 font-bold">Component generator</h1>
      <div className="space-y-2 text-center">
        <ButtonOutline onClick={selectLocation}>Select folder</ButtonOutline>
        {location && (
          <div className="text-sm">
            Location:{' '}
            <span className="text-gray-700 hover:text-black transition duration-200">
              {location}
            </span>
          </div>
        )}
      </div>
      <FormComponent input={input} setInput={setInput} location={location} />
    </div>
  );
};
