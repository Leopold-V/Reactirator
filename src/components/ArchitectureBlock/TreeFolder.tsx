import React, { Dispatch } from 'react';

export const TreeFolder = ({
  structure,
  dispatch,
}: {
  structure: any;
  dispatch: Dispatch<any>;
}) => {
  return (
    <div className="bg-white flex-grow border-gray-200 shadow text-gray-700 dark:bg-blueGray dark:text-white p-6 rounded-lg flex flex-col justify-center hover:shadow-lg transition duration-200">
      <h2 className="font-extrabold text-xl pb-6 text-center">Project Structure</h2>
    </div>
  );
};
