import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

//TODO:
//Add open in editor button
export const SuccessPage = () => {
  return (
    <div id="layout" className="relative bg-gray-50 h-screen">
      <div className="flex items-center h-full w-full px-8 py-4">
        <div className="flex flex-col items-center justify-center w-full space-y-4">
          <h1 className="font-bold text-2xl text-indigo-500 leading-4 py-6">Congratulation !</h1>
          <div className="w-1/3">
            <img src="../assets/undraw_well_done.svg" alt="well_done" />
          </div>
          <p className="py-6">Your project has been created successfully.</p>
          <Link
            to="/"
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowLeftIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Menu
          </Link>
        </div>
      </div>
    </div>
  );
};
