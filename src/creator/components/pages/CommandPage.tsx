import React from 'react';
import { ScriptSection } from '../ScriptBlock';

export const CommandPage = () => {
  return (
    <div className="flex flex-col w-full space-y-8">
      <div className="align-baseline">
        <ScriptSection />
      </div>
      <div className="bg-white flex-grow border-gray-200 shadow text-gray-700 dark:bg-blueGray dark:text-white p-6 rounded-lg flex flex-col justify-center hover:shadow-lg transition duration-200">
        <h2 className="text-center">Command control panel [Incoming feature]</h2>
      </div>
    </div>
  );
};
