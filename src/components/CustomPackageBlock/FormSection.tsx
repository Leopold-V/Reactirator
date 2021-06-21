import React, { ReactNode } from 'react';

export const FormSection = ({ children, title }: { children: ReactNode; title: string }) => {
  return (
    <div className={`w-full bg-gray-50 text-gray-700 py-4 rounded`}>
      <h3 className="font-bold text-center text-sm pb-4 ">{title}</h3>
      <div className="flex flex-wrap space-x-6 justify-center">{children}</div>
    </div>
  );
};