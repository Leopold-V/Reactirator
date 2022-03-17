import React, { FormEvent, useState } from 'react';

import { usePackageJson } from '../Contexts/PackageJsonProvider';

import { Card } from '../../../common/Card';
import { Button } from '../../../common/Button';
import { Input } from '../../../common/Input';
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
    <Card>
      <h2 className="font-extrabold text-gray-700 text-xl text-center py-2">Scripts edit</h2>
      <form className="flex flex-col items-center" onSubmit={handleAdd}>
        <div className="flex flex-col sm:flex-row justify-center flex-wrap py-4">
          <Input
            className="m-1 w-3/4"
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Script name..."
            value={input.name}
          />
          <Input
            onChange={handleChange}
            className="m-1 w-3/4"
            type="text"
            name="cmd"
            placeholder="Command..."
            value={input.cmd}
          />
        </div>
        <Button>
          Add
        </Button>
      </form>
      <ListScripts scripts={packageJson.scripts} />
    </Card>
  );
};
