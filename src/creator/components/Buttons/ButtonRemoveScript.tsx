import React from 'react';
import { usePackageJson } from '../Contexts/PackageJsonProvider';

export const ButtonRemoveScript = ({ name }: { name: string }) => {
  const { packageJson, dispatchJson } = usePackageJson();

  const handleClick = () => {
    const newScripts = { ...packageJson.scripts };
    delete newScripts[name];
    dispatchJson({ type: 'CHANGE_SCRIPTS', payload: { scripts: { ...newScripts } } });
  };

  return (
    <button
      type="button"
      className="flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
      onClick={handleClick}
    >
      <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
        <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
      </svg>
    </button>
  );
};
