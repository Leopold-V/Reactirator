import { nanoid } from 'nanoid';
import React, { ChangeEvent, Dispatch, FormEvent, useState } from 'react';
import { Card } from '../../../common/Card';
import { validateFileName } from '../../../utils/validateInput';
import { structureStateType, FileStructureType } from '../../helpers/types';

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
    <Card>
      <form className="space-y-4 w-full flex flex-col items-center" onSubmit={handleSubmit}>
        <h2 className="text-center text-lg font-bold">Folder</h2>
        <div className="space-x-3 w-10/12 flex justify-between items-center">
          <label className="font-semibold text-gray-700" htmlFor="foldername">
            Name
          </label>
          <input
            className="input w-3/4"
            type="text"
            name="foldername"
            id="foldername"
            placeholder="folder name"
            onChange={handleChange}
            value={foldername}
          />
        </div>
        <div className="space-x-3 w-10/12 flex justify-between items-center">
          <label htmlFor="folderlocation" className="font-semibold text-gray-700">
            Location
          </label>
          <select
            id="folderlocation"
            name="folderlocation"
            className="mt-1 mx-auto w-3/4 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
        <button className="mx-auto px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Create
        </button>
      </form>
    </Card>
  );
};

/*
    <div>
      <label htmlFor="folderlocation" className="block text-sm font-medium text-gray-700">
        Location
      </label>
      <select
        id="folderlocation"
        name="folderlocation"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
  */
