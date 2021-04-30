import React, { useState} from 'react'
import { ListPackagesFound } from './ListPackagesFound';
import { ListPackagesSelected } from './ListPackagesSelected';

const API_URL = "https://api.npms.io/v2/search?q=";

export const SearchPackages = ({listPackages, dispatchPackages}: {listPackages: any[], dispatchPackages: any}) => {

    const [input, setInput] = useState([]);

    const propsPackageFound = {
        listPackages: listPackages,
        dispatchPackages: dispatchPackages,
        results: input,
    };

    const propsPackagesSelected = {
        listPackages: listPackages,
        dispatchPackages: dispatchPackages,
    };

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
        <div className="py-6 flex justify-start min-h-big w-full divide-x-2">
            <div className="flex flex-col items-center w-1/2">
                <h1 className="font-bold pb-4">Add more packages :</h1>
                <div className="w-4/5">
                    <input className="w-full mb-1 text-center py-2 px-4 outline-none rounded bg-white ring-2 focus:ring-2 ring-indigo-400 transition duration-200" 
                        type="text" 
                        placeholder="react-router-dom, react-spinner etc."
                        onChange={handleChange}
                    />
                    <ListPackagesFound {...propsPackageFound} />
                </div>
            </div>
            <div className="flex flex-col items-center w-1/2">
                <h1 className="font-bold pb-4">Packages selected :</h1>
                <ListPackagesSelected {...propsPackagesSelected} />
            </div>
        </div>
    )
}
