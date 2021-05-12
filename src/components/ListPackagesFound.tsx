import React, { useContext, Dispatch } from 'react';
const request = require("request");
import { actionPackageType, listPackageType } from '../helpers/types';
import { PackageContext } from './context/PackageProvider';

export const ListPackagesFound = (
    {results, dispatchPackages}:
    {results: listPackageType, dispatchPackages: Dispatch<actionPackageType>}) => {

    const { packageJson, dispatchJson } = useContext(PackageContext);

    const addPackages = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
        e.preventDefault();
        dispatchPackages({type : 'ADD', payload: {destination: 'dependencies', name: e.currentTarget.dataset.name}});
        dispatchJson({type : 'ADD', payload: {
                category: 'dependencies', 
                name: e.currentTarget.dataset.name, 
                version: e.currentTarget.dataset.version
            }
        });
        //console.log(e.currentTarget.dataset.version);
        request({ url: `https://registry.npmjs.org/${e.currentTarget.dataset.name}`, json: true }, (err: any, res: any, body: any) => {
            if (!err) {
              let status = null;
              switch (res.statusCode) {
                case 400:
                  status = "Invalid data";
                  break;
                case 404:
                  status = "Package not found";
                  break;
                case 412:
                  status = "Precondition failed";
                  break;
              }
              console.log(e.currentTarget.dataset.version);
              console.log(res.body.versions);
            } else {
              throw err.message;
            }
        });
        /*const rep = await fetch(`https://registry.npmjs.org/${e.currentTarget.dataset.name}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
            },
        });
        const result = await rep.json();
        console.log(result.versions);*/
    };

    return (
        <ul className="absolute w-11/12 top-23 max-h-medium overflow-y-auto shadow">
            {results.map((ele) => (
                <li 
                    key={ele.name} 
                    className="flex items-center justify-center w-full h-9 overflow-hidden" 
                >
                    {Object.keys(packageJson.dependencies).includes(ele.name) ||
                    Object.keys(packageJson.devDependencies).includes(ele.name)
                    ? 
                    <div className="flex items-center justify-center text-sm font-semibold bg-gray-100 w-full h-full px-2">
                        {ele.name}
                    </div>
                    :
                    <div 
                        className="flex items-center justify-center text-sm font-semibold bg-white hover:bg-blue-100 transition duration-200
                        w-full h-full px-2 cursor-pointer"
                        data-name={ele.name}
                        data-version={ele.version}
                        onClick={addPackages}
                    >
                        {ele.name}
                    </div>}
                </li>
            ))}
        </ul>
    )
}
