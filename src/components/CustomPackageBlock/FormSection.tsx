import React, { ReactNode } from 'react';

export const FormSection = ({ children, title }: { children: ReactNode; title: string }) => {
  return (
    <div
      className={`w-full bg-gray-50 text-gray-700 dark:bg-gray-600 dark:text-white py-4 rounded`}
    >
      <h3 className="font-bold text-center text-sm pb-4 ">{title}</h3>
      <div className="flex flex-col flex-wrap items-center">{children}</div>
    </div>
  );
};
