import { nanoid } from 'nanoid';
import React, { ChangeEvent, Dispatch, FormEvent, useState } from 'react';
import { validateFileName } from '../../utils/validateInput';
import { structureStateType } from '../../helpers/types';

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
    <div className="bg-gradient-to-br from-yellow-200 to-yellow-200 flex-grow border-gray-200 shadow text-gray-700 p-6 rounded-lg flex flex-col justify-center hover:shadow-lg transition duration-200">
      <form className="space-y-4 text-center" onSubmit={handleSubmit}>
        <h2 className="text-center font-extrabold">Create Folder</h2>
        <div className="space-x-3">
          <label className="font-semibold" htmlFor="foldername">
            Name:{' '}
          </label>
          <input
            className="input"
            type="text"
            name="foldername"
            id="foldername"
            placeholder="folder name"
            onChange={handleChange}
            value={foldername}
          />
        </div>
        <div className="space-x-3">
          <label className="font-semibold" htmlFor="folderlocation">
            Location:{' '}
          </label>
          <select
            className="shadow rounded px-2 dark:text-gray-700"
            id="folderlocation"
            onChange={handleSelect}
          >
            {structure
              .filter((ele) => ele.isFolder)
              .map((ele) => (
                <option key={ele.id} data-id={ele.id}>
                  {ele.name}
                </option>
              ))}
          </select>
        </div>
        <div className="text-red-600 h-4">{error && error}</div>
        <button
          className="flex items-center mx-auto shadow-red bg-gray-900 opacity-100 px-4 py-2 outline-none font-bold
              tracking-wider text-white rounded-lg hover:opacity-90 focus:outline-none transition duration-250"
        >
          Create
        </button>
      </form>
    </div>
  );
};
