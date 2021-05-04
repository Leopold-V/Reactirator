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
import { ButtonCreation } from './ButtonCreation';
import { depStateType, formInputType } from '../helpers/types';

type argType = [
    filepath: string,
    input: formInputType
]

const initialDeps: depStateType = {
    dependencies: [],
    devDependencies: []
}

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
        <div className="z-10 flex flex-col w-11/12">
            <div className="flex justify-between">
                <div className="flex flex-col items-center w-4/6">
                    <div className="pt-6 pb-10 flex flex-wrap justify-around items-start w-full">
                        <div className="w-1/2">
                            <FormCustomProject input={input} setInput={setInput} />
                        </div>
                        <div className="flex flex-col h-full">
                            <CardProjectName input={input} setInput={setInput} />
                            <div className="h-full pt-10 flex items-center">
                                <ButtonCreation input={input} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start w-full">
                        <h2 className="font-extrabold mx-auto text-center text-2xl text-blue-900 pt-6 pb-10">Packages manager</h2>
                        <PackagesManager listPackages={listPackages} dispatchPackages={dispatch} />
                    </div>
                </div>
                <div className="w-2/6 flex pt-6">
                    <ResultLog />
                </div>
            </div>
            <Modal loading={loading} show={show} toggleModal={toggleModal} />
        </div>
    )
}