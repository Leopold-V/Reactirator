import { ipcRenderer } from 'electron';
import React, { useEffect, useState } from 'react';

import { formCompType } from '../../helpers/types';

import { Button, ButtonOutline } from '../../../common/Button';
import { FormComponent } from '../ComponentGenBlock';

const initialInput: formCompType = {
  functionComponent: false
}

export const ArchitectureManagerPage = () => {
  const [location, setLocation] = useState('');
  const [input, setInput] = useState(initialInput);
  const [name, setName] = useState('');
  const selectLocation = () => {
    ipcRenderer.send('open-directory', 'component');
  }

  useEffect(() => {
    ipcRenderer.on(
      'open-dialog-directory-selected-component', async (event: Electron.IpcRendererEvent, arg) => {
        const [filepath] = arg;
        setLocation(filepath[0]);
      })
    return () => {
      ipcRenderer.removeAllListeners('open-dialog-directory-selected-component');
    }
  }, [])
  

  return (
    <div className='flex flex-col items-center space-y-6'>
      <h1 className="pb-2 text-lg text-gray-700 font-bold">Component generator</h1>
      <div className="shadow">
        <ButtonOutline onClick={selectLocation}>Select folder</ButtonOutline>
      </div>
      {location && <div className="text-sm">Location of your new component: <span className="text-gray-700 hover:text-black transition duration-200">{ location}</span></div>}
      <FormComponent input={input} setInput={setInput} name={name} setName={setName} />
      <Button>Generate!</Button>
    </div>
  );
};
