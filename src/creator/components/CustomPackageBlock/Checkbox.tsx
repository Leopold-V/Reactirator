import { Switch } from '@headlessui/react';
import React, { Dispatch, ReactNode } from 'react';
import { searchPackages } from '../../../services/package.service';
import { actionPackageType, formInputType } from '../../helpers/types';
import { usePackageJson } from '../Contexts/PackageJsonProvider';

export const Checkbox = ({
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
          name={name}
          id={name}
          className={`${
            input[name] ? 'bg-blue-600' : 'bg-gray-300'
          } relative inline-flex items-center h-6 rounded-full w-11`}
        >
          <span className="sr-only">Run</span>
          <span
            className={`${
              input[name] ? 'translate-x-6' : 'translate-x-1'
            } inline-block w-4 h-4 transform bg-white rounded-full transition ease-in-out duration-200`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
};

/*
<div className="flex flex-row items-center py-1">
<label className="pr-2 text-sm" htmlFor={name}>
  {children}
</label>
<input
  className=""
  type="checkbox"
  onChange={handleChange}
  name={name}
  id={name}
  checked={input[name]}
/>
</div>
*/
