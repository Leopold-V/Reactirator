import React from 'react';
import { usePackageJson } from './Contexts/PackageJsonProvider';

export const ScriptSection = () => {
  const { packageJson } = usePackageJson();

  const handleSave = () => {};

  return (
    <div className="bg-white rounded shadow p-6 flex flex-col justify-start items-center space-y-4">
      <h2 className="font-extrabold text-gray-700 text-xl text-center py-2">Scripts edit</h2>
      <pre
        className="outline-none text-sm rounded p-1 bg-blue-50 focus:bg-blue-100 transition duration-200"
        contentEditable="true"
      >
        {JSON.stringify(packageJson.scripts, null, 2)}
      </pre>
      {/* <ul>
                {Object.entries(packageJson.scripts).map((script: any) => {
                    return (<li>{script[0]}</li>)
                })}
            </ul> */}
      <button
        onClick={handleSave}
        className="mt-2 mx-auto bg-green-400 opacity-100 px-4 py-2 outline-none
                            tracking-wider text-white rounded-lg hover:opacity-90 focus:outline-none transition duration-250"
      >
        Save
      </button>
    </div>
  );
};
