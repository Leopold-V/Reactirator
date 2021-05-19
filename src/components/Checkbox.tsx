import React, { ReactNode } from 'react';
import { getPackages } from '../services/packagesSearch';
import { formInputType } from '../helpers/types';
import { usePackageJson } from './context/PackageJsonProvider';

const Checkbox = ({
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
}) => {
  const { dispatchJson } = usePackageJson();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    setInput({ ...input, [e.target.name]: !input[e.target.name] });
    try {
      const packageFound = await getPackages(packageName);
      dispatchJson({
        type: e.target.name,
        payload: { version: packageFound.results[0].package.version },
      });
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
