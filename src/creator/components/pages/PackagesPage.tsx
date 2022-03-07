import React from 'react';
import { formInputType } from '../../helpers/types';
import { useDependencies } from '../Contexts/dependenciesProvider';
import { FormCustomProject } from '../CustomPackageBlock';
import { PackagesManager } from '../PackageManagerBlock';

export const PackagesPage = ({
  input,
  setInput,
}: {
  input: formInputType;
  setInput: (input: formInputType) => void;
}) => {
  const { listPackages, dispatch } = useDependencies();

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col space-y-8">
        <FormCustomProject input={input} setInput={setInput} dispatchPackages={dispatch} />
        <PackagesManager listPackages={listPackages} dispatchPackages={dispatch} />
      </div>
    </div>
  );
};