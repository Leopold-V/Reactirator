import React, { useState, useEffect, useRef, useContext } from 'react';
const { ipcRenderer } = require('electron');
import { toast } from 'react-hot-toast';

import { toastInstallMsg, toastInstallStyle, toastValidationStyle } from '../helpers/toast';
import initialState from '../helpers/initialState';
import { generateProject } from '../services/installation';
import validateInput from '../utils/validate_input';

import FormSection from './FormSection';
import Checkbox from './Checkbox';
import { PackageContext } from './context/PackageContext';

export const Form = (
        {loading, setLoading, toggleModal, listPackages}: 
        {loading: boolean, setLoading: any, toggleModal: any, listPackages: string[]}
    ) => {
    const [input, setInput] = useState(initialState);
    const { packageJson, dispatchJson } = useContext(PackageContext);

    const appname_ref = useRef(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInput({...input, appname: e.target.value});
        packageJson.name = e.target.value;
        dispatchJson({type: 'CHANGE_NAME', payload: e.target.value})
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!validateInput(input.appname)) {
            toast('The project name is invalid !', toastValidationStyle);
        } else {
            ipcRenderer.send('open-directory', input); 
        }
    };

    useEffect(() => {
        appname_ref.current.focus();
    }, []);

    useEffect(() => {
        ipcRenderer.on('open-dialog-directory-selected', async (event: Electron.IpcRendererEvent, arg: any) => {
            const [filepath, input] = arg;
            if (arg) {
                setLoading(true);
                toggleModal();
                try {
                    setTimeout(() => {
                        console.log('hello');
                setLoading(false);
                        
                    }, 3000);
                    //await toast.promise(generateProject(filepath, input, listPackages), toastInstallMsg, toastInstallStyle);
                } catch (error) {
                    console.log(error);
                }
            }
          });
          return () => {
            ipcRenderer.removeAllListeners('open-dialog-directory-selected');
          };
    }, [listPackages])

    return (
        <div className="flex flex-col items-center py-6 space-y-6">
            <div className="flex flex-row justify-around items-center w-full">
                <label className="font-bold pr-4" htmlFor="appname">Project name :</label>
                <input 
                    onChange={handleChange} 
                    value={input.appname} 
                    className="py-2 px-4 outline-none rounded bg-white ring-2 focus:ring-2 ring-indigo-400 transition duration-200" 
                    type="text" 
                    name="appname" 
                    id="appname" 
                    placeholder="Application name" 
                    ref={appname_ref}
                />
            </div>
            <FormSection title="Syntax">
                <Checkbox name="typescript" setInput={setInput} input={input} >Typescript : </Checkbox>
                <Checkbox name="prettier" setInput={setInput} input={input} >Prettier : </Checkbox>
                <Checkbox name="flow" setInput={setInput} input={input} >Flow : </Checkbox>
            </FormSection>
            <FormSection title="Styles">
                <Checkbox name="tailwind" setInput={setInput} input={input} >Tailwind : </Checkbox>
                <Checkbox name="bootstrap" setInput={setInput} input={input} >Bootstrap : </Checkbox>
                <Checkbox name="normalize" setInput={setInput} input={input} >CSS reset : </Checkbox>
            </FormSection>
            <FormSection title="Packages">
                <Checkbox name="sourcemapexplorer" setInput={setInput} input={input} >source-map-explorer : </Checkbox>
                <Checkbox name="storybook" setInput={setInput} input={input} >Storybook : </Checkbox>
            </FormSection>

            {loading ?
            <button className="bg-red-300 px-4 py-2 font-semibold text-center tracking-wider text-white rounded cursor-not-allowed" disabled>
                <svg className="animate-spin -ml-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </button>
            :
            <button
                onClick={handleSubmit}
                className="bg-red-500 px-4 py-2 font-semibold tracking-wider text-white rounded hover:bg-red-700 transition duration-250">
                Create
            </button>}
        </div>
    )
}
