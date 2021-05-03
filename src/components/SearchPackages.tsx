import React, { useState, Dispatch } from 'react'
import { ListPackagesFound } from './ListPackagesFound';
import { ListPackagesSelected } from './ListPackagesSelected';
import { listPackageType } from '../helpers/types';
import { actionPackageType } from '../helpers/types';

const API_URL = "https://api.npms.io/v2/search?q=";

export const SearchPackages = (
    {listPackages, dispatchPackages}:
    {listPackages: string[], dispatchPackages: Dispatch<actionPackageType>}) => {

    const [input, setInput] = useState<listPackageType>([]);

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

    return (
        <div className="bg-white text-gray-800 rounded shadow w-3/5">
            <div className="py-6 flex justify-start divide-x-2">
                <div className="flex flex-col items-center w-1/2 relative">
                    <h2 className="font-extrabold pb-4">✅ Add more packages ?</h2>
                    <input className="w-4/5 mb-1 text-center py-2 px-4 outline-none rounded bg-white ring-1 focus:ring-2 ring-blue-500 transition duration-200" 
                        type="text" 
                        placeholder="react-router-dom, react-spinner etc."
                        onChange={handleChange}
                    />
                    <ListPackagesFound dispatchPackages={dispatchPackages} results={input} />
                </div>
                <div className="flex flex-col items-center w-1/2">
                    <h1 className="font-bold pb-4">
                        {listPackages.length > 0 ? listPackages.length+' ' : ''}
                        Package{listPackages.length > 1 && 's'} to install :
                    </h1>
                    <ListPackagesSelected dispatchPackages={dispatchPackages} listPackages={listPackages} />
                </div>
            </div>
        </div>
    )
}
