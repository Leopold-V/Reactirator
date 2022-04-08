import React from 'react';
import launchEditor from 'react-dev-utils/launchEditor';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/outline';

export const SuccessPage = ({ location }: {location: { pathname: string, state: string }}) => {
  const projectPath = location.state;

  const redirectToEditor = () => {
    try {
      launchEditor(projectPath, 1, 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="layout" className="relative bg-gray-50 h-screen">
      <div className="flex items-center h-full w-full px-8 py-4">
        <div className="flex flex-col items-center justify-center w-full space-y-4">
          <h1 className="font-bold text-2xl text-indigo-500 leading-4 py-6">Congratulation !</h1>
          <div className="w-1/3">
            <img src="../assets/undraw_well_done.svg" alt="well_done" />
          </div>
          <p className="pt-6 pb-2">Your project has been created successfully.</p>
          <button
            id="open_project"
            className="flex items-center space-x-1 cursor-pointer mb-6"
            onClick={redirectToEditor}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#575c65"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            <span className="text-sm text-gray-700">Open in editor</span>
          </button>
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
