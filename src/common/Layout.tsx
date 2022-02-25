import React, { ReactNode } from 'react';
import { SideNav } from './SideNav';
import './layout.css';
import { Toaster } from 'react-hot-toast';

export const Layout = ({
  theme,
  setTheme,
  children,
}: {
  theme: string;
  setTheme: (theme: string) => void;
  children: ReactNode;
}) => {
  return (
    <div
      id="layout"
      className="relative bg-gray-50 dark:bg-primary overflow-y-auto pt-8 flex flex-row h-screen"
    >
      <SideNav theme={theme} setTheme={setTheme} />
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
