import React, { MouseEventHandler, ReactNode } from 'react';
import { TrashIcon } from '@heroicons/react/outline';

export const Button = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      onClick={onClick}
      className="mx-auto px-4 py-2 border border-transparent text-base font-medium rounded shadow text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
    >
      {children}
    </button>
  );
};

export const ButtonSecondary = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium shadow rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
    >
      {children}
    </button>
  );
};

export const ButtonDelete = ({
  children,
  onClick,
  disabled = false,
}: {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="inline-flex items-center leading-4 px-4 py-2 rounded border disabled:opacity-60 disabled:border-gray-400 disabled:text-gray-400  border-red-600 shadow text-sm text-red-600 bg-white hover:bg-gray-50 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200"
    >
      <TrashIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
      {children}
    </button>
  );
};

export const ButtonOutline = ({
  children,
  onClick,
  disabled = false,
}: {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="inline-flex items-center leading-4 px-4 py-2 rounded shadow border disabled:opacity-60 disabled:border-gray-400 disabled:text-gray-400  border-indigo-600 text-sm text-indigo-600 bg-white hover:bg-gray-50 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
    >
      {children}
    </button>
  );
};
