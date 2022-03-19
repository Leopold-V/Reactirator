import React, { ReactNode } from 'react';
import { SideNav } from './SideNav';
import './layout.css';
import { Toaster } from 'react-hot-toast';

export const Layout = ({children,
}: {
  children: ReactNode;
}) => {
  return (
    <div
      id="layout"
      className="relative bg-gray-50 overflow-y-auto pt-8 flex flex-row h-screen"
    >
      <SideNav />
      <div className="flex w-full px-8 py-7">{children}</div>
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
