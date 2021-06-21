import React, { Dispatch, ReactNode } from 'react';
import { searchPackages } from '../../services/package.service';
import { actionPackageType, formInputType } from '../../helpers/types';
import { usePackageJson } from '../Contexts/PackageJsonProvider';

export const Checkbox = ({
  children,
  name,
  packageName,
  setInput,
  input,
  dispatchPackages,
}: {
  children: ReactNode;
  name: string;
  packageName: string;
  setInput: (input: formInputType) => void;
  input: any;
  dispatchPackages: Dispatch<actionPackageType>;
}) => {
  const { dispatchJson } = usePackageJson();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    setInput({ ...input, [e.target.name]: !input[e.target.name] });
    try {
      const packageFound = await searchPackages(packageName);
      console.log(packageFound);
      dispatchJson({
        type: e.target.name,
        payload: { version: packageFound[0].package.version },
      });
      //  dispatchPackages({
      //    type: 'ADD',
      //    payload: {
      //      destination: 'dependencies',
      //      name: packageName,
      //      size: await calculatePackageSize(packageName, packageFound[0].package.version),
      //    },
      //  });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row items-center">
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
  );
};
