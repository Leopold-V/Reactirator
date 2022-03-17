import { Switch } from '@headlessui/react';
import React, { Dispatch, ReactNode } from 'react';
import { searchPackages } from '../../../services/package.service';
import { actionPackageType, formInputType } from '../../helpers/types';

import { usePackageJson } from '../Contexts/PackageJsonProvider';

export const SwitchPackage = ({
  children,
  name,
  packageName,
  setInput,
  input,
}: {
  children: ReactNode;
  name: string;
  packageName: string;
  setInput: (input: formInputType) => void;
  input: any;
  dispatchPackages: Dispatch<actionPackageType>;
}) => {
  const { dispatchJson } = usePackageJson();

  const handleChange = async () => {
    setInput({ ...input, [name]: !input[name] });
    try {
      const packageFound = await searchPackages(packageName);
      dispatchJson({
        type: name,
        payload: { version: packageFound[0].package.version },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Switch.Group>
      <div className="flex items-center justify-between w-2/3 py-1">
        <Switch.Label>{children}</Switch.Label>
        <Switch
          checked={input[name]}
          onChange={handleChange}
          className={`flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none`}
        >
          <span className="sr-only">Run</span>
          <span aria-hidden="true" className="pointer-events-none absolute w-full h-full rounded-md" />
          <span
            aria-hidden="true"
            className={`
              ${input[name] ? 'bg-indigo-600' : 'bg-gray-300'}
              pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200
            `}
          />
          <span
            className={`${
              input[name] ? 'translate-x-5' : 'translate-x-1'
            } pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
};