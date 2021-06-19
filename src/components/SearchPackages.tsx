import React, { useState, useRef, useEffect, Dispatch } from 'react';

import { ListPackagesFound } from './ListPackagesFound';

import { listPackageType } from '../helpers/types';
import { actionPackageType } from '../helpers/types';
import { getPackages } from '../services/packagesSearch';

export const SearchPackages = ({
  dispatchPackages,
}: {
  dispatchPackages: Dispatch<actionPackageType>;
}) => {
  const [input, setInput] = useState<listPackageType>([]);
  const [isOpen, setIsOpen] = useState(false);

  const input_ref = useRef(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (e.target.value !== '') {
      try {
        const packagesFound = await getPackages(e.target.value);
        const results: listPackageType = packagesFound.map((ele: any) => ({
          name: ele.package.name,
          version: ele.package.version,
          description: ele.package.description,
          score: ele.score.final,
        }));
        setInput(results);
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
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
  }, []);

  return (
    <div className="p-6 bg-white text-gray-800 rounded shadow">
      <div ref={input_ref} className="flex flex-col items-center relative">
        <h2 className="font-extrabold pb-4">Add packages</h2>
        <input
          className="mb-1 input"
          type="text"
          placeholder="e.g react-router-dom, react-spinner"
          onChange={handleChange}
        />
        {isOpen && <ListPackagesFound dispatchPackages={dispatchPackages} results={input} />}
      </div>
    </div>
  );
};
