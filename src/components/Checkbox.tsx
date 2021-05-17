import React, { ReactNode, useContext } from 'react';
import { formInputType } from '../helpers/types';
import { PackageContext } from './context/PackageJsonProvider';

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
  const { dispatchJson } = useContext(PackageContext);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    setInput({ ...input, [e.target.name]: !input[e.target.name] });
    try {
      const rep = await fetch(`https://api.npms.io/v2/search?q=${packageName}`);
      const result = await rep.json();
      dispatchJson({
        type: e.target.name,
        payload: { version: result.results[0].package.version },
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
