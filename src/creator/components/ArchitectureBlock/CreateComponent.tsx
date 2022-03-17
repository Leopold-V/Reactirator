import React, { ChangeEvent, FormEvent, useState, Dispatch } from 'react';
import { nanoid } from 'nanoid';

import { validateFileName } from '../../../utils/validateInput';
import { structureStateType, FileStructureType } from '../../helpers/types';

import { Card } from '../../../common/Card';
import { Button } from '../../../common/Button';
import { Input } from '../../../common/Input';

export const CreateComponent = ({
  structure,
  dispatchStructure,
}: {
  structure: structureStateType;
  dispatchStructure: Dispatch<any>;
}) => {
  const [select, setSelect] = useState('1');
  const [filename, setFilename] = useState('');
  const [mode, setMode] = useState('rfc');
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilename(e.target.value);
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.options[e.target.selectedIndex].dataset.id);
  };

  const handleChangeMode = (e: ChangeEvent<HTMLInputElement>) => {
    setMode(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const isNameExist = structure.filter(
      (ele) =>
        ele.name.toLocaleLowerCase() === filename.toLocaleLowerCase() && ele.ancestor === select
    );
    const isValid = validateFileName(filename);
    if (isNameExist.length > 0) setError('File name already exist');
    else if (!isValid) setError('Invalid file name');
    else {
      setError('');
      const ancestorPath = structure.find((ele) => ele.id === select).path;
      dispatchStructure({
        type: 'ADD',
        payload: {
          id: nanoid(),
          name: filename,
          ancestor: select,
          isFolder: false,
          mode: mode,
          path: ancestorPath + '\\' + filename,
        },
      });
    }
  };

  return (
    <Card>
      <form className="space-y-4 w-full flex flex-col items-center" onSubmit={handleSubmit}>
        <h2 className="text-center text-lg font-bold">Component</h2>
        <div className="space-x-3 w-10/12 flex justify-between items-center">
          <label className="font-semibold text-gray-700" htmlFor="filename">
            Name
          </label>
          <Input
            className="input w-2/3"
            type="text"
            name="filename"
            id="filename"
            placeholder="file name"
            onChange={handleChange}
            value={filename}
          />
        </div>
        <div className="space-x-3 w-10/12 flex justify-between items-center">
          <label htmlFor="filelocation" className="font-semibold text-gray-700">
            Location
          </label>
          <select
            id="filelocation"
            name="filelocation"
            onChange={handleSelect}
            className="mt-1 mx-auto w-2/3 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {structure
              .filter((ele: FileStructureType) => ele.isFolder)
              .map((ele) => (
                <option key={ele.id} data-id={ele.id}>
                  {ele.name}
                </option>
              ))}
          </select>
        </div>
        <div className="font-semibold">Mode: </div>
        <div className="flex justify-center space-x-3 text-sm w-full" onChange={handleChangeMode}>
          <div>
            <input type="radio" id="rfc" name="mode" value="rfc" checked={mode === 'rfc'} readOnly />
            <label className="px-1" htmlFor="rfc">
              rfc
            </label>
          </div>
          <div>
            <input type="radio" id="rcc" name="mode" value="rcc" checked={mode === 'rcc'} readOnly />
            <label className="px-2" htmlFor="rcc">
              rcc
            </label>
          </div>
          <div>
            <input type="radio" id="rfce" name="mode" value="rfce" checked={mode === 'rfce'} readOnly />
            <label className="px-2" htmlFor="rfce">
              rfce
            </label>
          </div>
          <div>
            <input type="radio" id="rafc" name="mode" value="rafc" checked={mode === 'rafc'} readOnly />
            <label className="px-2" htmlFor="rafc">
              rafc
            </label>
          </div>
          <div>
            <input type="radio" id="rafce" name="mode" value="rafce" checked={mode === 'rafce'} readOnly />
            <label className="px-2" htmlFor="rafce">
              rafce
            </label>
          </div>
        </div>
        <div className="text-red-600 h-4">{error && error}</div>
        <Button>
          Create
        </Button>
      </form>
    </Card>
  );
};
