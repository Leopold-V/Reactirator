import React, { ChangeEvent, Dispatch, FormEvent, useState } from 'react';
import { nanoid } from 'nanoid';

import { validateFileName } from '../../../utils/validateInput';
import { structureStateType, FileStructureType } from '../../helpers/types';

import { Input } from '../../../common/Input';
import { Title } from '../../../common/Typo';
import { ButtonOutline } from '../../..//common/Button';

export const CreateFolder = ({
  structure,
  dispatchStructure,
}: {
  structure: structureStateType;
  dispatchStructure: Dispatch<any>;
}) => {
  const [select, setSelect] = useState('1');
  const [foldername, setFoldername] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFoldername(e.target.value);
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.options[e.target.selectedIndex].dataset.id);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(foldername);
    const isNameExist = structure.filter(
      (ele) =>
        ele.name.toLocaleLowerCase() === foldername.toLocaleLowerCase() && ele.ancestor === select
    );
    const isValid = validateFileName(foldername);
    if (isNameExist.length > 0) setError('Folder name already exist');
    else if (!isValid) setError('Invalid folder name');
    else {
      setError('');
      const ancestorPath = structure.find((ele) => ele.id === select).path;
      dispatchStructure({
        type: 'ADD',
        payload: {
          id: nanoid(),
          name: foldername,
          ancestor: select,
          isFolder: true,
          path: ancestorPath + '\\' + foldername,
        },
      });
    }
  };

  return (
    <form className="space-y-2 px-4 w-full flex flex-col items-center" onSubmit={handleSubmit}>
      <Title title="Folder" />
      <div className="w-11/12">
        <label className="block text-sm font-medium text-gray-700" htmlFor="foldername">
          Name
        </label>
        <Input
          className="w-full"
          type="text"
          name="foldername"
          id="foldername"
          placeholder="e.g. component"
          onChange={handleChange}
          value={foldername}
        />
      </div>
      <div className="w-11/12">
        <label className="block text-sm font-medium text-gray-700" htmlFor="folderlocation">
          Location
        </label>
        <select
          id="folderlocation"
          name="folderlocation"
          className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          onChange={handleSelect}
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
      <div className="text-red-600 h-4">{error && error}</div>
      <ButtonOutline>Create</ButtonOutline>
    </form>
  );
};
