import React, { useState} from 'react'
import { ListPackagesFound } from './ListPackagesFound';
import { ListPackagesSelected } from './ListPackagesSelected';

const API_URL = "https://api.npms.io/v2/search?q=";

export const SearchPackages = ({listPackages, dispatchPackages}: {listPackages: string[], dispatchPackages: any}) => {

    const [input, setInput] = useState([]);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value !== "") {
        const rep = await fetch(`${API_URL}${e.target.value}`);
        const res = await rep.json();
        const results = res.results.map((ele: any) => ele.package);
        results.length = 10;
        setInput(results);
      } else {
        setInput([]);
      }
    };

    return (
        <div className="bg-white text-gray-800 rounded shadow w-3/5">
            <div className="py-6 flex justify-start min-h-big w-full divide-x-2">
                <div className="flex flex-col items-center w-1/2">
                    <h1 className="font-bold pb-4">Add more packages :</h1>
                    <input className="w-4/5 mb-1 text-center py-2 px-4 outline-none rounded bg-white ring-2 focus:ring-2 ring-blue-500 transition duration-200" 
                        type="text" 
                        placeholder="react-router-dom, react-spinner etc."
                        onChange={handleChange}
                    />
                    <ListPackagesFound dispatchPackages={dispatchPackages} results={input} />
                </div>
                <div className="flex flex-col items-center w-1/2">
                    <h1 className="font-bold pb-4">Packages selected :</h1>
                    <ListPackagesSelected dispatchPackages={dispatchPackages} listPackages={listPackages} />
                </div>
            </div>
        </div>
    )
}
