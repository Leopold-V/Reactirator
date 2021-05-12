import React, { useContext, useEffect, useRef } from 'react';
import { formInputType } from '../helpers/types';
import { ButtonCreation } from './ButtonCreation';
import { PackageContext } from './context/PackageProvider';

export const CardProjectName = ({input, setInput}: {input: formInputType, setInput: (input: formInputType) => void}) => {

    const { packageJson, dispatchJson } = useContext(PackageContext);

    const appname_ref = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInput({...input, appname: e.target.value});
        packageJson.name = e.target.value;
        dispatchJson({type: 'CHANGE_NAME', payload: e.target.value})
    };

    useEffect(() => {
        appname_ref.current.focus();
    }, []);

    return (
        <div className="bg-white text-gray-700 p-6 rounded flex flex-col justify-center shadow">
            <h2 className="font-extrabold text-xl pb-6 text-center">🚀 Create a project 🚀</h2>
            <div className="flex flex-row justify-around items-center w-full pb-6">
                <input 
                    onChange={handleChange} 
                    className="text-center text-sm py-2 px-4
                    rounded bg-gray-200 text-gray-700 outline-none" 
                    type="text" 
                    name="appname" 
                    id="appname" 
                    placeholder="Application name" 
                    ref={appname_ref}
                />
            </div>
            <ButtonCreation input={input} />
        </div>
    )
}
