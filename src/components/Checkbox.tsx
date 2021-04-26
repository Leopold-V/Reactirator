import React, { ReactNode } from 'react'
//import { formInputType } from '../helpers/types';

const Checkbox = ({children, name, setInput, input}: {children: ReactNode, name: string, setInput: any, input: any}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInput({...input, [e.target.name]: !input[e.target.name]});
    }

    return (
        <div className="flex flex-row items-center">
            <label className="font-semibold pr-2" htmlFor={name}>{children}</label>
            <input className="" 
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