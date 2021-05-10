import React, { useState, useRef, useEffect, Dispatch, MouseEvent } from 'react';
import { listPackageType } from '../helpers/types';
import { ListPackagesFound } from './ListPackagesFound';
import { actionPackageType } from '../helpers/types';

const API_URL = "https://api.npms.io/v2/search?q=";

export const SearchPackages = (
  { dispatchPackages }:
  { dispatchPackages: Dispatch<actionPackageType> }) => {
  const [input, setInput] = useState<listPackageType>([]);
  const [isOpen, setIsOpen] = useState(false);

  const input_ref = useRef(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (e.target.value !== "") {
      try {
        const rep = await fetch(`${API_URL}${e.target.value}`);
        const res = await rep.json();
        const results: listPackageType = res.results.map((ele: any) => ({name: ele.package.name, version: ele.package.version}));
        results.length = 10;
        setInput(results);
        console.log(results);
      } catch (error) {
        console.log('Error fetching the API');
      }
    } else {
      setInput([]);
    }
  };

  const handleClick = (e: any): void => {
      if (input_ref.current.contains(e.target)) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick);
  }, []);

  return (
    <div className="p-6 lg:flex-grow bg-white text-gray-800 rounded shadow">
        <div ref={input_ref} className="flex flex-col items-center relative">
            <h2 className="font-extrabold pb-4">✅ Add more packages</h2>
            <input className="w-full mb-1 text-center text-sm py-2 px-4
            rounded bg-gray-200 text-black outline-none"
                type="text" 
                placeholder="eg. react-router-dom, react-spinner"
                onChange={handleChange}
            />
            {isOpen && <ListPackagesFound dispatchPackages={dispatchPackages} results={input} />}
        </div>
    </div>
  )
}
