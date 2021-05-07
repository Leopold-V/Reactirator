import React, { ReactNode, useContext } from 'react'
import { formInputType } from '../helpers/types';
import { PackageContext } from './context/PackageContext';

const Checkbox = (
    {children, name, setInput, input}:
    {children: ReactNode, name: string, setInput: (input: formInputType) => void, input: any}) => {
    const { dispatchJson } = useContext(PackageContext);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInput({...input, [e.target.name]: !input[e.target.name]});
        dispatchJson({type: e.target.name})
    };

    return (
        <div className="flex flex-row items-center">
            <label className=" pr-2 " htmlFor={name}>{children}</label>
            <input className="text-pink-600" 
                type="checkbox" 
                onChange={handleChange}
                name={name} 
                id={name} 
                checked={input[name]}
            />
        </div>
    )
}

export default Checkbox;