// @ts-nocheck
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { TerminalOutputInstallation } from './';
import { Hook, Unhook } from 'console-feed';

export const ModalInstallation = ({
  loading,
  show,
  toggleModal,
}: {
  loading: boolean;
  show: boolean;
  toggleModal: () => void;
}) => {
  const cancelButtonRef = useRef(null);
  const [logs, setLogs] = useState('');

  useEffect(() => {
    Hook(
      window.console,
      (log) => {
        setLogs(log.data[0] + '\n'); // if (logs) => logs + log.data[0] then all logs are displayed with each new log.
      },
      false
    );
    return () => Unhook(window.console);
  }, []);

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        unmount={false}
        initialFocus={cancelButtonRef}
        onClose={() => {
          return;
        }}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative w-1/2 inline-block bg-white rounded overflow-hidden shadow-xl transform transition-all align-middle">
              <div className="flex flex-col justify-center items-center">
                <Dialog.Title className="text-xl text-black font-bold py-4">
                  Installation
                </Dialog.Title>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`icon icon-tabler icon-tabler-settings ${
                    loading ? 'animate-spin-slow' : ''
                  }`}
                  width="90"
                  height="90"
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
                <TerminalOutputInstallation logs={...logs} />
              </div>
              <div className="bg-gray-50 px-6 py-3 flex justify-center">
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
                    onClick={toggleModal}
                    ref={cancelButtonRef}
                    className="bg-red-500 px-4 py-2 font-semibold tracking-wider text-white rounded hover:bg-red-700 transition duration-250"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
