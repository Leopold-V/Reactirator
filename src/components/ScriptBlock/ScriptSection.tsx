import React, { FormEvent, useState } from 'react';
import { usePackageJson } from '../Contexts/PackageJsonProvider';
import { ButtonAddScript } from '../Buttons';
import { ListScripts } from './ListScripts';

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
    <div className="w-96 bg-white dark:bg-blueGray dark:text-white rounded shadow py-6 px-2 flex flex-col justify-start items-center space-y-4 hover:shadow-lg transition duration-200">
      <h2 className="font-extrabold text-gray-700 dark:text-white text-xl text-center py-2">
        Scripts edit
      </h2>

      <form className="flex flex-col items-center" onSubmit={handleAdd}>
        <div className="flex flex-col sm:flex-row justify-center flex-wrap">
          <input
            className="m-1 input w-3/4"
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Script name..."
            value={input.name}
          />
          <input
            onChange={handleChange}
            className="m-1 input w-3/4"
            type="text"
            name="cmd"
            placeholder="Command..."
            value={input.cmd}
          />
        </div>
        <ButtonAddScript />
      </form>
      <ListScripts scripts={packageJson.scripts} />
    </div>
  );
};
