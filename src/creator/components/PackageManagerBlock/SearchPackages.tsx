import React, { useState, useRef, useEffect, Dispatch } from 'react';

import { ListPackagesFound } from './ListPackagesFound';

import { actionPackageType, listPackageType } from '../../helpers/types';
import { searchPackages } from '../../../services/package.service';
import { Card } from '../../../common/Card';
import { SearchIcon } from '@heroicons/react/outline';

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
        const packagesFound = await searchPackages(e.target.value);
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
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <Card>
      <div ref={input_ref} className="flex flex-col items-center relative">
        <h2 className="font-extrabold text-xl pb-4 text-center">Add packages</h2>
        <div className="relative w-1/2 mb-3">
          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
            <SearchIcon className="h-5 w-5 text-gray-700" aria-hidden="true" />
          </div>
          <input
            id="search_package"
            name="search_package"
            className="block w-full text-gray-700 bg-gray-100 border border-gray-300 rounded-md py-2 pl-10 pr-3 placeholder-gray-500 focus:outline-none focus:bg-gray-50 focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            placeholder="Search"
            type="search_package"
            onChange={handleChange}
          />
        </div>
        {isOpen && <ListPackagesFound dispatchPackages={dispatchPackages} results={input} />}
      </div>
    </Card>
  );
};


/*
  <input
    className="mb-1 input bg-gray-200 focus:bg-white"
    type="text"
    placeholder="e.g react-router-dom, react-spinner"
    onChange={handleChange}
  />
*/

/*
    <Transition.Root show={open} as={Fragment} afterLeave={() => setQuery('')}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
            onChange={(person) => (window.location = person.url)}
          >
            <div className="relative">
              <SearchIcon
                className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <Combobox.Input
                className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Search..."
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>

            {filteredPeople.length > 0 && (
              <Combobox.Options static className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800">
                {filteredPeople.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    value={person}
                    className={({ active }) =>
                      classNames('cursor-default select-none px-4 py-2', active && 'bg-indigo-600 text-white')
                    }
                  >
                    {person.name}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}

            {query !== '' && filteredPeople.length === 0 && (
              <p className="p-4 text-sm text-gray-500">No people found.</p>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>

*/