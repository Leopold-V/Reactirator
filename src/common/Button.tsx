import { TrashIcon } from '@heroicons/react/outline';
import React, { MouseEventHandler } from 'react'

export const Button = ({ children, onClick } : { children: string, onClick?: MouseEventHandler<HTMLButtonElement>}) => {
    return (
        <button
          onClick={onClick}
          className="mx-auto px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          { children }
        </button>
      );
}

export const ButtonSecondary = ({ children, onClick } : { children: string, onClick?: MouseEventHandler<HTMLButtonElement>}) => {
  return (
      <button
        onClick={onClick}
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
        { children }
      </button>
    );
}

export const ButtonDelete = ({ children, onClick, disabled = false } : { children: string, onClick?: MouseEventHandler<HTMLButtonElement>, disabled?: boolean}) => {
  return (
      <button
        disabled={disabled}
        onClick={onClick}
        className="inline-flex items-center leading-4 px-4 py-2 rounded border disabled:opacity-60 disabled:border-gray-400 disabled:text-gray-400  border-red-600 shadow-sm text-sm text-red-600 bg-white hover:bg-gray-50 font-medium rounded-mdfocus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
        <TrashIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        { children }
      </button>
    );
}