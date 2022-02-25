import React, { useState, Dispatch, ChangeEvent, MouseEvent } from 'react';
import toast from 'react-hot-toast';
import { validateFileName } from '../../../utils/validateInput';
import { structureStateType } from '../../helpers/types';
import { ButtonEditFilename, ButtonRemoveFile } from '../Buttons';

export const TreeItem = ({
  structure,
  dispatchStructure,
  id,
  name,
  isFolder,
  ancestor,
}: {
  structure: structureStateType;
  dispatchStructure: Dispatch<any>;
  id: string;
  name: string;
  isFolder: boolean;
  ancestor: string;
}) => {
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [nameEdit, setNameEdit] = useState(name);
  const [display, setDisplay] = useState(true);

  const childrenItems = structure.filter((ele) => ele.ancestor === id);

  const toggleDisplay = () => {
    setDisplay((display) => !display);
  };

  const displayButtons = () => {
    if (name !== 'src' && name !== 'App') setVisible(true);
  };

  const hideButtons = () => {
    if (name !== 'src' && name !== 'App') setVisible(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setNameEdit(e.target.value);
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (nameEdit !== name) {
      const isNameExist = structure.filter(
        (ele) => ele.name.toLowerCase() === nameEdit.toLowerCase() && ele.ancestor === ancestor
      );
      const isValid = validateFileName(nameEdit);
      if (isNameExist.length > 0) {
        setNameEdit(name);
        toast.error('This filename already exists in the same folder.');
      } else if (!isValid) {
        setNameEdit(name);
        toast.error('Invalid name.');
      } else {
        dispatchStructure({ type: 'EDIT', payload: { id: id, newName: nameEdit } });
      }
    }
    setIsEdit(false);
  };

  return (
    <li>
      <div
        className={`flex items-center justify-between py-1 hover:bg-gray-100 dark:hover:bg-gray-400 transition duration-200 cursor-pointer`}
        onMouseEnter={displayButtons}
        onMouseLeave={hideButtons}
        onClick={toggleDisplay}
      >
        <div className={`${isFolder ? 'space-x-1' : ''} flex items-center px-1`}>
          {isFolder ? (
            <div className="flex items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  display ? '' : 'transform -rotate-90'
                } icon icon-tabler icon-tabler-chevron-down transition duration-200`}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#000000"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <polyline points="6 9 12 15 18 9" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-folder"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#7c5f01"
                fill="#ffe368"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" />
              </svg>
            </div>
          ) : (
            <svg
              version="1.1"
              id="Layer_2_1_"
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="27"
              viewBox="0 0 841.9 595.3"
            >
              <g>
                <path
                  fill="#61DAFB"
                  d="M666.3,296.5c0-32.5-40.7-63.3-103.1-82.4c14.4-63.6,8-114.2-20.2-130.4c-6.5-3.8-14.1-5.6-22.4-5.6v22.3   c4.6,0,8.3,0.9,11.4,2.6c13.6,7.8,19.5,37.5,14.9,75.7c-1.1,9.4-2.9,19.3-5.1,29.4c-19.6-4.8-41-8.5-63.5-10.9   c-13.5-18.5-27.5-35.3-41.6-50c32.6-30.3,63.2-46.9,84-46.9l0-22.3c0,0,0,0,0,0c-27.5,0-63.5,19.6-99.9,53.6   c-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7,0,51.4,16.5,84,46.6c-14,14.7-28,31.4-41.3,49.9c-22.6,2.4-44,6.1-63.6,11   c-2.3-10-4-19.7-5.2-29c-4.7-38.2,1.1-67.9,14.6-75.8c3-1.8,6.9-2.6,11.5-2.6l0-22.3c0,0,0,0,0,0c-8.4,0-16,1.8-22.6,5.6   c-28.1,16.2-34.4,66.7-19.9,130.1c-62.2,19.2-102.7,49.9-102.7,82.3c0,32.5,40.7,63.3,103.1,82.4c-14.4,63.6-8,114.2,20.2,130.4   c6.5,3.8,14.1,5.6,22.5,5.6c27.5,0,63.5-19.6,99.9-53.6c36.4,33.8,72.4,53.2,99.9,53.2c8.4,0,16-1.8,22.6-5.6   c28.1-16.2,34.4-66.7,19.9-130.1C625.8,359.7,666.3,328.9,666.3,296.5z M536.1,229.8c-3.7,12.9-8.3,26.2-13.5,39.5   c-4.1-8-8.4-16-13.1-24c-4.6-8-9.5-15.8-14.4-23.4C509.3,224,523,226.6,536.1,229.8z M490.3,336.3c-7.8,13.5-15.8,26.3-24.1,38.2   c-14.9,1.3-30,2-45.2,2c-15.1,0-30.2-0.7-45-1.9c-8.3-11.9-16.4-24.6-24.2-38c-7.6-13.1-14.5-26.4-20.8-39.8   c6.2-13.4,13.2-26.8,20.7-39.9c7.8-13.5,15.8-26.3,24.1-38.2c14.9-1.3,30-2,45.2-2c15.1,0,30.2,0.7,45,1.9   c8.3,11.9,16.4,24.6,24.2,38c7.6,13.1,14.5,26.4,20.8,39.8C504.7,309.8,497.8,323.2,490.3,336.3z M522.6,323.3   c5.4,13.4,10,26.8,13.8,39.8c-13.1,3.2-26.9,5.9-41.2,8c4.9-7.7,9.8-15.6,14.4-23.7C514.2,339.4,518.5,331.3,522.6,323.3z    M421.2,430c-9.3-9.6-18.6-20.3-27.8-32c9,0.4,18.2,0.7,27.5,0.7c9.4,0,18.7-0.2,27.8-0.7C439.7,409.7,430.4,420.4,421.2,430z    M346.8,371.1c-14.2-2.1-27.9-4.7-41-7.9c3.7-12.9,8.3-26.2,13.5-39.5c4.1,8,8.4,16,13.1,24C337.1,355.7,341.9,363.5,346.8,371.1z    M420.7,163c9.3,9.6,18.6,20.3,27.8,32c-9-0.4-18.2-0.7-27.5-0.7c-9.4,0-18.7,0.2-27.8,0.7C402.2,183.3,411.5,172.6,420.7,163z    M346.7,221.9c-4.9,7.7-9.8,15.6-14.4,23.7c-4.6,8-8.9,16-13,24c-5.4-13.4-10-26.8-13.8-39.8C318.6,226.7,332.4,224,346.7,221.9z    M256.2,347.1c-35.4-15.1-58.3-34.9-58.3-50.6c0-15.7,22.9-35.6,58.3-50.6c8.6-3.7,18-7,27.7-10.1c5.7,19.6,13.2,40,22.5,60.9   c-9.2,20.8-16.6,41.1-22.2,60.6C274.3,354.2,264.9,350.8,256.2,347.1z M310,490c-13.6-7.8-19.5-37.5-14.9-75.7   c1.1-9.4,2.9-19.3,5.1-29.4c19.6,4.8,41,8.5,63.5,10.9c13.5,18.5,27.5,35.3,41.6,50c-32.6,30.3-63.2,46.9-84,46.9   C316.8,492.6,313,491.7,310,490z M547.2,413.8c4.7,38.2-1.1,67.9-14.6,75.8c-3,1.8-6.9,2.6-11.5,2.6c-20.7,0-51.4-16.5-84-46.6   c14-14.7,28-31.4,41.3-49.9c22.6-2.4,44-6.1,63.6-11C544.3,394.8,546.1,404.5,547.2,413.8z M585.7,347.1c-8.6,3.7-18,7-27.7,10.1   c-5.7-19.6-13.2-40-22.5-60.9c9.2-20.8,16.6-41.1,22.2-60.6c9.9,3.1,19.3,6.5,28.1,10.2c35.4,15.1,58.3,34.9,58.3,50.6   C644,312.2,621.1,332.1,585.7,347.1z"
                />
                <polygon fill="#61DAFB" points="320.8,78.4 320.8,78.4 320.8,78.4  " />
                <circle fill="#61DAFB" cx="420.9" cy="296.5" r="45.7" />
                <polygon fill="#61DAFB" points="520.5,78.1 520.5,78.1 520.5,78.1  " />
              </g>
            </svg>
          )}
          {isEdit ? (
            <input
              type="text"
              className="text-center w-28 text-sm py-1 px-2 transition duration-200 shadow
              rounded bg-white outline-none border-2 border-transparent focus:ring-2 focus:ring-blue-300
              dark:placeholder-gray-400 dark:text-gray-50 dark:border-gray-600 dark:bg-gray-600 dark:focus:ring-1
              dark:focus:ring-indigo-500 dark:focus:bg-gray-900 dark:focus:border-transparent;"
              value={nameEdit}
              onClick={(e) => e.stopPropagation()}
              onChange={handleChange}
            />
          ) : (
            <h4 className={`${isFolder ? 'font-bold' : ''} w-32 overflow-hidden overflow-ellipsis`}>
              {name}
            </h4>
          )}
        </div>
        <div className={`${visible ? 'visible' : 'hidden'} flex items-center space-x-1 px-1`}>
          {isEdit ? (
            <button onClick={handleSubmit}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-check"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#00b341"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l5 5l10 -10" />
              </svg>
            </button>
          ) : (
            <ButtonEditFilename setIsEdit={setIsEdit} />
          )}
          <ButtonRemoveFile id={id} dispatchStructure={dispatchStructure} />
        </div>
      </div>
      <ul className={`${display ? 'visible' : 'hidden'} ml-4 border-l-2 border-gray-200`}>
        {childrenItems.map((ele) => (
          <TreeItem
            key={ele.id}
            structure={structure}
            id={ele.id}
            name={ele.name}
            isFolder={ele.isFolder}
            ancestor={ele.ancestor}
            dispatchStructure={dispatchStructure}
          />
        ))}
      </ul>
    </li>
  );
};
