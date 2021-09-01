import React, { ChangeEvent, FormEvent, useState, Dispatch } from 'react';
import { validateFileName } from '../../utils/validateInput';
import { structureStateType } from '../../helpers/types';

export const CreateComponent = ({ structure, dispatchStructure }: { structure: structureStateType, dispatchStructure: Dispatch<any>; }) => {
  const [select, setSelect] = useState('');
  const [filename, setFilename] = useState('');
  const [mode, setMode] = useState('rfc');
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilename(e.target.value);
  }

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };

  const handleChangeMode = (e: ChangeEvent<HTMLInputElement>) => {
    setMode(e.target.value);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const isNameExist = structure.filter((ele) => ele.name === filename);
    const isValid = validateFileName(filename);
    if (isNameExist.length > 0) setError('File name already exist');
    else if (!isValid) setError('Invalid file name');
    else {
      setError('');
      dispatchStructure({ type: 'ADD', payload: { name: filename, ancestor: select, isFolder: false, mode: mode}})
    }
  }

  return (
    <div className="bg-white flex-grow border-gray-200 shadow text-gray-700 dark:bg-blueGray dark:text-white p-6 rounded-lg flex flex-col justify-center hover:shadow-lg transition duration-200">
      <form className="space-y-4 text-center" onSubmit={handleSubmit}>
        <h2 className="text-center font-extrabold">Create Component</h2>
        <div className="space-x-3">
          <label className="font-semibold" htmlFor="filename">Name: </label>
          <input
            className="input"
            type="text"
            name="filename"
            id="filename"
            placeholder="file name"
            onChange={handleChange}
            value={filename}
          />
        </div>
        <div className="space-x-3">
          <label className="font-semibold" htmlFor="folderlocation">Location: </label>
          <select className="shadow rounded px-2" id="folderlocation" onChange={handleSelect}>
            <option>src</option>
            {structure
              .filter((ele) => ele.isFolder)
              .map((ele) => (
                <option>{ele.name}</option>
              ))}
          </select>
        </div>
        <div className="font-semibold">Mode: </div>
        <div className="flex justify-center space-x-4" onChange={handleChangeMode}>
          <div className="space-x-2">
            <input
              type="radio"
              id="rfc"
              name="mode"
              value="rfc"
              checked={mode === 'rfc'}
            />
            <label htmlFor="rfc">rfc</label>
          </div>
          <div className="space-x-2">
            <input
              type="radio"
              id="rcc"
              name="mode"
              value="rcc"
              checked={mode === 'rcc'}
            />
            <label htmlFor="rcc">rcc</label>
          </div>
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
