import React, { useState, useEffect, useRef } from 'react';
const { ipcRenderer } = require('electron');
import { toast } from 'react-hot-toast';

import { toastInstallMsg, toastInstallStyle, toastValidationStyle } from '../helpers/toast';
import initialState from '../helpers/initialState';
import { generateProject } from '../services/installation';
import validateInput from '../utils/validate_input';

import FormSection from './FormSection';
import Checkbox from './Checkbox';

export const Form = ({loading, setLoading} : {loading: boolean, setLoading: any}) => {

    const [input, setInput] = useState(initialState);

    const appname_ref = useRef(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInput({...input, appname: e.target.value});
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateInput(input.appname)) {
            toast('The project name is invalid !', toastValidationStyle);
        } else {
            ipcRenderer.send('open-directory', input); 
        }
    }

    useEffect(() => {
        appname_ref.current.focus();
    }, [])

    useEffect(() => {
        ipcRenderer.on('open-dialog-directory-selected', async (event: Electron.IpcRendererEvent, arg: any) => {
            const [filepath, input] = arg;
            if (arg) {
                setLoading(true);
                try {
                    await toast.promise(generateProject(filepath, input), toastInstallMsg, toastInstallStyle);
                } catch (error) {
                    console.log(error);
                }
                setLoading(false);
            }
          });
          return () => {
            ipcRenderer.removeAllListeners('open-dialog-directory-selected');
          };
    }, [])

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center py-6 space-y-6">
            <div className="flex flex-row justify-between items-center w-full">
                <label className="font-bold pr-4" htmlFor="appname">Project name :</label>
                <input 
                    onChange={handleChange} 
                    value={input.appname} 
                    className="py-2 px-4 rounded-sm outline-none bg-gray-50 focus:bg-white transition duration-200 border-gray-300 border-2" 
                    type="text" 
                    name="appname" 
                    id="appname" 
                    placeholder="Application name" 
                    ref={appname_ref}
                />
            </div>
            <FormSection title="Syntax">
                <Checkbox name="typescript" setInput={setInput} input={input}>Typescript : </Checkbox>
                <Checkbox name="prettier" setInput={setInput} input={input}>Prettier : </Checkbox>
            </FormSection>
            <FormSection title="Styles">
                <Checkbox name="tailwind" setInput={setInput} input={input}>Tailwind : </Checkbox>
                <Checkbox name="bootstrap" setInput={setInput} input={input}>Bootstrap : </Checkbox>
                <Checkbox name="normalize" setInput={setInput} input={input}>CSS reset : </Checkbox>
                <Checkbox name="styledcomponents" setInput={setInput} input={input}>Styled-components : </Checkbox>
            </FormSection>
            <FormSection title="Packages">
                <Checkbox name="reactrouter" setInput={setInput} input={input}>react-router-dom : </Checkbox>
                <Checkbox name="proptypes" setInput={setInput} input={input}>prop-types : </Checkbox>
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
                className="bg-red-500 px-4 py-2 font-semibold tracking-wider text-white rounded hover:bg-red-700 transition duration-250">
                Create
            </button>}
        </form>
    )
}
