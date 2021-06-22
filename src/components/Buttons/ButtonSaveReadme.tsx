import React from 'react';

export const ButtonSaveReadme = ({ hasChanged }: { hasChanged: boolean }) => {
  if (hasChanged) {
    return (
      <button
        className="my-1 mx-auto bg-indigo-500 opacity-100 px-4 py-1 outline-none
                                    tracking-wider text-white rounded hover:opacity-90 focus:outline-none transition duration-250"
      >
        Save
      </button>
    );
  } else {
    return (
      <button
        className="my-1 mx-auto bg-indigo-500 px-4 py-1 outline-none opacity-60 cursor-not-allowed
                                    tracking-wider text-white rounded hover:opacity-90 focus:outline-none transition duration-250"
        disabled
      >
        Save
      </button>
    );
  }
};
