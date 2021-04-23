import React, { useState, useEffect } from 'react';
const { ipcRenderer } = require('electron');

import initialState from '../helpers/initialState';
import { generateProject } from '../services/installation';
import validateInput from '../utils/validate_input';
import Checkbox from './Checkbox';

export const Form = () => {

    const [input, setInput] = useState(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInput({...input, appname: e.target.value});
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateInput(input.appname)) {
            console.log('pas cool');
        } else {
            ipcRenderer.send('open-directory', input); 
        }
    }

    useEffect(() => {
        ipcRenderer.on('open-dialog-directory-selected', async (event, arg) => {
            const [filepath, input] = arg;
            if (arg) {
                generateProject(filepath, input);
            }
          });
          return () => {
            ipcRenderer.removeAllListeners('open-dialog-directory-selected');
          };
    }, [])

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center mb-10 space-y-6">
            <h2 className="font-bold text-xl py-6">Generator form :</h2>
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
                <Checkbox name="typescript" change={setInput} input={input}>Typescript : </Checkbox>
                <Checkbox name="prettier" change={setInput} input={input}>Prettier : </Checkbox>
                </div>
            </div>

            <div className="w-full border-gray-200 border-t-2">
                <h3 className="font-bold text-center py-4">Styles :</h3>
                <div className="flex flex-wrap space-x-6 justify-center">
                    <Checkbox name="tailwind" change={setInput} input={input}>Tailwind : </Checkbox>
                    <Checkbox name="bootstrap" change={setInput} input={input}>Bootstrap : </Checkbox>
                    <Checkbox name="normalize" change={setInput} input={input}>normalize.css : </Checkbox>
                    <Checkbox name="styledcomponents" change={setInput} input={input}>Styled-components : </Checkbox>
                </div>
            </div>

            <div className="w-full border-gray-200 border-t-2">
                <h3 className="font-bold w-full text-center py-4">Packages :</h3>
                <div className="flex flex-wrap space-x-6 justify-center">
                    <Checkbox name="reactrouter" change={setInput} input={input}>react-router-dom : </Checkbox>
                    <Checkbox name="propstype" change={setInput} input={input}>Props-type : </Checkbox>
                </div>
            </div>

            <button className="bg-blue-500 px-4 py-2 mt-10 font-semibold tracking-wider text-white rounded hover:bg-blue-700 transition duration-250">
                Create
            </button>
        </form>
    )
}
