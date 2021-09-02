import React, { MouseEvent } from 'react';
import { Dispatch } from 'react';

export const ButtonRemoveFile = ({
  id,
  dispatchStructure,
}: {
  id: string;
  dispatchStructure: Dispatch<any>;
}) => {
  const removeItem = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatchStructure({ type: 'REMOVE', payload: { id: id } });
  };

  return (
    <button onClick={removeItem}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-trash transform hover:rotate-45 transition duration-200"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#3d3d3d"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="4" y1="7" x2="20" y2="7" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
      </svg>
    </button>
  );
};
