import React, { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import { StepControlButtons } from './StepControlButtons';
import { StepBar } from './StepBar';

export const LayoutCreator = ({ children }: { children: ReactNode }) => {
  return (
    <div id="layout" className="relative bg-gray-50 h-screen">
        <h1 className="text-center text-lg text-black pt-12 pb-4">Project creation</h1>
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