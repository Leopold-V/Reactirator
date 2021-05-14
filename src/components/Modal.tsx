import React from 'react';
import { ConsoleLogs } from './ConsoleLogs';

export const Modal = ({
  loading,
  show,
  toggleModal,
}: {
  loading: boolean;
  show: boolean;
  toggleModal: () => void;
}) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed w-screen h-screen flex justify-center items-center top-0 left-0">
      <div className="absolute bg-gray-700 opacity-60 w-screen h-screen top-0 left-0"></div>
      <div className="bg-white rounded z-50 flex flex-col justify-center items-center p-6 lg:w-1/3">
        <h2 className="text-xl text-black font-bold py-4">Installation...</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`icon icon-tabler icon-tabler-settings ${loading ? 'animate-spin-slow' : ''}`}
          width="130"
          height="130"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="black"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <div className="bg-black rounded overflow-auto h-80 my-6 lg:w-4/5">
          <ConsoleLogs />
        </div>
        {loading ? (
          <button
            className="bg-red-300 px-4 py-2 font-semibold text-center tracking-wider text-white rounded cursor-not-allowed"
            disabled
          >
            <svg
              className="animate-spin -ml-1 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </button>
        ) : (
          <button
            onClick={() => toggleModal()}
            className="bg-red-500 px-4 py-2 font-semibold tracking-wider text-white rounded hover:bg-red-700 transition duration-250"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};
