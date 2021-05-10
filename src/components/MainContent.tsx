import React, { useReducer, useState, useEffect } from 'react'
const { ipcRenderer } = require('electron');

import { toast } from 'react-hot-toast';

import dependenciesReducer from '../reducers/dependenciesReducer';
import { useModal } from '../hooks/useModal';
import { toastInstallMsg, toastInstallStyle } from '../helpers/toast';
import initialState from '../helpers/initialState';
import { generateProject } from '../services/installation';

import { FormCustomProject } from './FormCustomProject';
import { Modal } from './Modal';
import { PackagesManager } from './PackagesManager';
import { ResultLog } from './ResultLog';
import { CardProjectName } from './CardProjectName';
import { formInputType, depStateType } from '../helpers/types';

const initialDeps: depStateType = {
    dependencies: [],
    devDependencies: []
}

type argType = [
    filepath: string,
    input: formInputType
]

export const MainContent = () => {
    const [show, toggleModal] = useModal();
    const [loading, setLoading] = useState(false);
    const [listPackages, dispatch] = useReducer(dependenciesReducer, initialDeps);

    const [input, setInput] = useState(initialState);

    useEffect(() => {
        ipcRenderer.on('open-dialog-directory-selected', async (event: Electron.IpcRendererEvent, arg: argType) => {
            const [filepath, input] = arg;
            if (arg) {
                setLoading(true);
                toggleModal();
                try {
                    await toast.promise(generateProject(filepath, input, listPackages), toastInstallMsg, toastInstallStyle);
                } catch (error) {
                    console.log(error);
                }
                setLoading(false);
            }
          });
          return () => {
            ipcRenderer.removeAllListeners('open-dialog-directory-selected');
          };
    }, [listPackages])

    return (
        <div className="z-10 flex flex-col pt-2 w-11/12">
            <div className="mx-auto">
                <CardProjectName input={input} setInput={setInput} />
            </div>
            
            <div className="flex justify-between">

                <div className="w-3/12 -mt-36">
                    <FormCustomProject input={input} setInput={setInput} />
                </div>

                <div className="flex-grow flex flex-col pt-12">
                    <PackagesManager listPackages={listPackages} dispatchPackages={dispatch} />
                </div>

                <div className="w-3/12 -mt-36">
                    <ResultLog />
                </div>

            </div>

            <Modal loading={loading} show={show} toggleModal={toggleModal} />
        </div>
    )
}