import React, { FormEvent, useState } from 'react';
import { usePackageJson } from './Contexts/PackageJsonProvider';
import { ButtonAddScript, ButtonRemoveScript } from './Buttons';

export const ScriptSection = () => {
  const { packageJson, dispatchJson } = usePackageJson();
  const [input, setInput] = useState({ name: '', cmd: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setInput((input) => ({ ...input, [e.target.name]: e.target.value }));
  };

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    if (input.name && input.cmd) {
      dispatchJson({
        type: 'CHANGE_SCRIPTS',
        payload: { scripts: { ...packageJson.scripts, [input.name]: input.cmd } },
      });
      setInput({ name: '', cmd: '' });
    }
  };

  return (
    <div className="bg-white rounded shadow p-6 flex flex-col justify-start items-center space-y-4">
      <h2 className="font-extrabold text-gray-700 text-xl text-center py-2">Scripts edit</h2>

      <form className="flex flex-col items-center" onSubmit={handleAdd}>
        <div className="flex flex-col sm:flex-row justify-center flex-wrap">
          <input
            className="m-1 text-center rounded bg-gray-100 text-sm px-3 py-2 focus:outline-none"
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Script name..."
            value={input.name}
          />
          <input
            onChange={handleChange}
            className="m-1 text-center rounded bg-gray-100 text-sm px-3 py-2 focus:outline-none"
            type="text"
            name="cmd"
            placeholder="Command..."
            value={input.cmd}
          />
        </div>
        <ButtonAddScript />
      </form>
      {
        <ul className="text-sm flex flex-wrap justify-center items-center">
          {Object.entries(packageJson.scripts).map((script: any) => {
            return (
              <li className="m-1 text-green-700 rounded shadow flex items-center">
                <ButtonRemoveScript name={script[0]} />
                <div className="px-3 py-1 bg-green-50">
                  <span className="font-bold">{script[0]}:</span> {script[1]}
                </div>
              </li>
            );
          })}
        </ul>
      }
    </div>
  );
};
