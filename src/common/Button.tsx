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
