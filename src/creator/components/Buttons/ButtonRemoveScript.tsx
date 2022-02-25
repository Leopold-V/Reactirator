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
      onClick={handleClick}
      className="p-1 h-full bg-blue-50 hover:bg-red-200 border-none focus:outline-none transition duration-200"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="red">
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};
