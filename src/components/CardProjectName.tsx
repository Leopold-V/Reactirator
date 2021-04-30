import React, { useContext, useEffect, useRef } from 'react';
import { PackageContext } from './context/PackageContext';

export const CardProjectName = ({input, setInput}: {input: any, setInput: any}) => {

    const { packageJson, dispatchJson } = useContext(PackageContext);

    const appname_ref = useRef(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInput({...input, appname: e.target.value});
        packageJson.name = e.target.value;
        dispatchJson({type: 'CHANGE_NAME', payload: e.target.value})
    };

    useEffect(() => {
        appname_ref.current.focus();
    }, []);

    return (
        <div className="bg-white text-gray-800 p-6 rounded-lg flex flex-col justify-center shadow">
            <h2 className="font-extrabold text-xl py-6 text-center">🚀 Create a project 🚀</h2>
            <div className="flex flex-row justify-around items-center w-full pb-6">
                <label className="pr-4 font-semibold" htmlFor="appname">Name ?</label>
                <input 
                    onChange={handleChange} 
                    className="py-2 px-4 outline-none rounded bg-white ring-2 focus:ring-2 ring-blue-500 transition duration-200" 
                    type="text" 
                    name="appname" 
                    id="appname" 
                    placeholder="Application name" 
                    ref={appname_ref}
                />
            </div>
        </div>
    )
}
