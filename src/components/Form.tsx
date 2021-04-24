import React, { useState, useEffect } from 'react';
const { ipcRenderer } = require('electron');
import { toast } from 'react-hot-toast';

import initialState from '../helpers/initialState';
import { generateProject } from '../services/installation';
import validateInput from '../utils/validate_input';
import Checkbox from './Checkbox';

export const Form = ({loading, setLoading} : {loading: boolean, setLoading: any}) => {

    const [input, setInput] = useState(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInput({...input, appname: e.target.value});
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateInput(input.appname)) {
            toast('The project name is invalid !',
                {
                    icon: '❌',
                    style: {
                        margin: '16px',
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        } else {
            ipcRenderer.send('open-directory', input); 
        }
    }

    useEffect(() => {
        ipcRenderer.on('open-dialog-directory-selected', async (event, arg) => {
            const [filepath, input] = arg;
            if (arg) {
                setLoading(true);
                await toast.promise(
                    generateProject(filepath, input),
                    {
                      loading: 'Installation start !',
                      success: () => `Successfully installed !`,
                      error: (err) => `An error happened: ${err.toString()}`
                    },
                    {
                        style: {
                            margin: '16px',
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                        loading: {
                            duration: 2000
                        },
                        success: {
                            duration: 5000,
                            icon: '✅',
                        },
                        error: {
                            duration: 5000,
                            icon: '❌',
                        },
                    }
                  );
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
                <input onChange={handleChange} value={input.appname} className="py-2 px-4 rounded-sm border-gray-300 border-2" 
                    type="text" 
                    name="appname" 
                    id="appname" 
                    placeholder="Application name" 
                />
            </div>
            <div className="w-full border-gray-200 border-t-2">
                <h3 className="font-bold text-center py-4">Syntax :</h3>
                <div className="flex flex-wrap space-x-6 justify-center">
                    <Checkbox name="typescript" setInput={setInput} input={input}>Typescript : </Checkbox>
                    <Checkbox name="prettier" setInput={setInput} input={input}>Prettier : </Checkbox>
                </div>
            </div>

            <div className="w-full border-gray-200 border-t-2">
                <h3 className="font-bold text-center py-4">Styles :</h3>
                <div className="flex flex-wrap space-x-6 justify-center">
                    <Checkbox name="tailwind" setInput={setInput} input={input}>Tailwind : </Checkbox>
                    <Checkbox name="bootstrap" setInput={setInput} input={input}>Bootstrap : </Checkbox>
                    <Checkbox name="normalize" setInput={setInput} input={input}>normalize.css : </Checkbox>
                    <Checkbox name="styledcomponents" setInput={setInput} input={input}>Styled-components : </Checkbox>
                </div>
            </div>

            <div className="w-full border-gray-200 border-t-2">
                <h3 className="font-bold text-center py-4">Packages :</h3>
                <div className="flex flex-wrap space-x-6 justify-center">
                    <Checkbox name="reactrouter" setInput={setInput} input={input}>react-router-dom : </Checkbox>
                    <Checkbox name="proptypes" setInput={setInput} input={input}>Props-type : </Checkbox>
                </div>
            </div>
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
            </button>
            }
        </form>
    )
}
