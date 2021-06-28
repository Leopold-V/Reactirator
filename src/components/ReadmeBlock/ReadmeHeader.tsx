import React, { MouseEvent } from 'react';

export const ReadmeHeader = ({ tab, setTab }: { tab: string; setTab: (tab: string) => void }) => {
  const handleTab = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLLIElement;
    setTab(target.innerText);
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="font-extrabold text-gray-700 dark:text-white text-xl text-center py-4 pl-2 md:pl-0">
        Readme.md
      </h1>
      <div className="space-x-1">
        <button
          className={`hover:bg-gray-50 dark:text-white dark:hover:bg-gray-600 focus:outline-none hover:text-indigo-600 border-b-4 border-transparent focus:border-indigo-600
                ${
                  tab === 'Edit' ? 'border-indigo-600' : ''
                } rounded transition duration-200 px-2 py-1`}
          onClick={handleTab}
        >
          Edit
        </button>
        <button
          className={`hover:bg-gray-50 dark:text-white dark:hover:bg-gray-600 focus:outline-none hover:text-indigo-600 border-b-4 border-transparent focus:border-indigo-600
                ${
                  tab === 'Preview' ? 'border-indigo-600' : ''
                } rounded transition duration-200 px-2 py-1`}
          onClick={handleTab}
        >
          Preview
        </button>
      </div>
    </div>
  );
};
