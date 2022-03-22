import React from 'react';
import { Link } from 'react-router-dom';
import { FolderOpenIcon } from '@heroicons/react/outline';

export const ManagerMenuSelection = () => {
  return (
    <div className="text-center px-6 w-1/2">
      <FolderOpenIcon strokeWidth={1} className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">Open a project.</h3>
      <p className="mt-1 text-sm text-gray-500">Pick a React project and start working.</p>
      <div className="mt-6">
        <Link
          to='/manager'
          className="inline-flex transition duration-200 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Open project
        </Link>
      </div>
    </div>
  )
}