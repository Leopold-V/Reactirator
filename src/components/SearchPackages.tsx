import React, { useState, useRef, useEffect, Dispatch } from 'react'
import { listPackageType } from '../helpers/types';
import { ListPackagesFound } from './ListPackagesFound';
import { actionPackageType } from '../helpers/types';

const API_URL = "https://api.npms.io/v2/search?q=";

export const SearchPackages = (
    {dispatchPackages}:
    {dispatchPackages: Dispatch<actionPackageType>}) => {
    const [input, setInput] = useState<listPackageType>([]);
    const [isOpen, setIsOpen] = useState(false);

    const input_ref = useRef(null);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
      if (e.target.value !== "") {
        const rep = await fetch(`${API_URL}${e.target.value}`);
        const res = await rep.json();
        const results: listPackageType = res.results.map((ele: any) => ({name: ele.package.name, version: ele.package.version}));
        results.length = 10;
        setInput(results);
      } else {
        setInput([]);
      }
    };

    useEffect(() => {
      document.addEventListener('click', (e: any) => {
        console.log(input_ref.current.contains(e.target));
        if (input_ref.current.contains(e.target)) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      });
    }, [])

    return (
        <div ref={input_ref} className="p-6 lg:flex-grow bg-white text-gray-800 rounded shadow">
            <div className="flex flex-col items-center relative">
                <h2 className="font-extrabold pb-4">✅ Add more packages ?</h2>
                <input className="w-4/5 mb-1 text-center py-2 px-4
                outline-none rounded bg-white ring-1 focus:ring-2 ring-blue-500 transition duration-200" 
                    type="text" 
                    placeholder="react-router-dom, react-spinner etc."
                    onChange={handleChange}
                />
                {isOpen && <ListPackagesFound dispatchPackages={dispatchPackages} results={input} />}
            </div>
        </div>
    )
}
