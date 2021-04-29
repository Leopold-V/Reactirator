import React, { ReactNode } from 'react'
import manageSpecialCases from '../utils/manageSpecialCases';

const Checkbox = ({children, name, setInput, input, packageJson, setPackageJson}: {children: ReactNode, name: string, setInput: any, input: any, packageJson: any, setPackageJson: any}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInput({...input, [e.target.name]: !input[e.target.name]});
        setPackageJson(manageSpecialCases(e.target.name, packageJson));
    };

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