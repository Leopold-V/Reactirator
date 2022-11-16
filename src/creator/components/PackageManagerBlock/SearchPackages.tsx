import React, { useState, useRef, useEffect, Dispatch } from 'react';
import { SearchIcon } from '@heroicons/react/outline';

import { actionPackageType, listPackageType } from '../../helpers/types';
import { searchPackages } from '../../../services/package.service';

import { ListPackagesFound } from './ListPackagesFound';
import { Input } from '../../../common/Input';

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
          scoreDetail: {
            quality: ele.score.detail.quality,
            popularity: ele.score.detail.popularity,
            maintenance: ele.score.detail.maintenance,
          },
          links: {
            npm: ele.package.links.npm,
            repository: ele.package.links.repository,
          },
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
    <div ref={input_ref} className="relative w-2/3">
      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
        <SearchIcon className="h-5 w-5 text-gray-700" aria-hidden="true" />
      </div>
      <Input
        id="search_package"
        name="search_package"
        className="w-full"
        placeholder="Search"
        type="search_package"
        onChange={handleChange}
      />
      {isOpen && <ListPackagesFound dispatchPackages={dispatchPackages} results={input} />}
    </div>
  );
};
