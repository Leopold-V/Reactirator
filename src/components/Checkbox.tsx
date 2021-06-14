import React, { Dispatch, ReactNode } from 'react';
import { getPackages } from '../services/packagesSearch';
import { actionPackageType, formInputType } from '../helpers/types';
import { usePackageJson } from './context/PackageJsonProvider';

const Checkbox = ({
  children,
  name,
  packageName,
  setInput,
  input,
  dispatchPackages
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
      const packageFound = await getPackages(packageName);
      dispatchJson({
        type: e.target.name,
        payload: { version: packageFound[0].package.version },
      });
      // dispatchPackages({
      //   type: 'ADD',
      //   payload: {
      //     destination: 'dependencies',
      //     name: packageName,
      //     size: await calculatePackageSize(packageName, packageFound.results[0].package.version),
      //   },
      // });
    } catch (error) {
      console.log('Error fetching the API');
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

export default Checkbox;
