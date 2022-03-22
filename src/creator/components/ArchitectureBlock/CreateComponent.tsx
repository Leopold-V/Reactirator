import React, { ChangeEvent, FormEvent, useState, Dispatch } from 'react';
import { nanoid } from 'nanoid';

import { validateFileName } from '../../../utils/validateInput';
import { structureStateType, FileStructureType } from '../../helpers/types';

import { Input } from '../../../common/Input';
import { Title } from '../../../common/Typo';
import { ButtonOutline } from '../../../common/Button';

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
    <form className="space-y-2 px-4 w-full flex flex-col items-center" onSubmit={handleSubmit}>
      <Title title="Component" />
      <div className="w-11/12">
        <label className="block text-sm font-medium text-gray-700" htmlFor="filename">
          Name
        </label>
        <Input
          className="w-full"
          type="text"
          name="filename"
          id="filename"
          placeholder="e.g. Button"
          onChange={handleChange}
          value={filename}
        />
      </div>
      <div className="w-11/12">
        <label className="block text-sm font-medium text-gray-700" htmlFor="filelocation">
          Location
        </label>
        <select
          id="filelocation"
          name="filelocation"
          onChange={handleSelect}
          className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
        <div className="flex">
          <input type="radio" id="rfc" name="mode" value="rfc" checked={mode === 'rfc'} readOnly />
          <label className="px-1" htmlFor="rfc">
            rfc
          </label>
        </div>
        <div className="flex">
          <input type="radio" id="rcc" name="mode" value="rcc" checked={mode === 'rcc'} readOnly />
          <label className="px-2" htmlFor="rcc">
            rcc
          </label>
        </div>
        <div className="flex">
          <input
            type="radio"
            id="rfce"
            name="mode"
            value="rfce"
            checked={mode === 'rfce'}
            readOnly
          />
          <label className="px-2" htmlFor="rfce">
            rfce
          </label>
        </div>
        <div className="flex">
          <input
            type="radio"
            id="rafc"
            name="mode"
            value="rafc"
            checked={mode === 'rafc'}
            readOnly
          />
          <label className="px-2" htmlFor="rafc">
            rafc
          </label>
        </div>
        <div className="flex">
          <input
            type="radio"
            id="rafce"
            name="mode"
            value="rafce"
            checked={mode === 'rafce'}
            readOnly
          />
          <label className="px-2" htmlFor="rafce">
            rafce
          </label>
        </div>
      </div>
      <div className="text-red-600 h-4">{error && error}</div>
      <ButtonOutline>Create</ButtonOutline>
    </form>
  );
};
