import React, { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { ArrowLeftIcon } from '@heroicons/react/outline';

import { StepBar } from './StepBar';
import { StepControlButtons } from './StepControlButtons';
import { Link } from 'react-router-dom';

export const LayoutCreator = ({ children }: { children: ReactNode }) => {
  return (
    <div id="layout" className="relative bg-gray-50 h-screen">
      <div className="absolute left-6 top-12">
        <Link
          to="/"
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <ArrowLeftIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
          Menu
        </Link>
      </div>
      <div className="absolute right-6 top-12">
        <img src="../assets/icons/png/32x32.png" alt="icon" />
      </div>
      <div className="flex justify-center items-center space-x-2 text-center pt-12 pb-4">
        <h1 className=" text-lg text-black">Creation process</h1>
      </div>
      <div className="flex justify-center mx-auto pt-4 pb-12">
        <StepBar />
      </div>
      <div className="flex w-full px-8 py-4">{children}</div>
      <div className="w-full text-center absolute bottom-6">
        <StepControlButtons />
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            margin: '300px',
          },
        }}
      />
    </div>
  );
};
