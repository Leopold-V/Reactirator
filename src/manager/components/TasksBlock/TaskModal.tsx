import React, { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/outline';
import { TerminalOutput } from '../Terminal';

type TaskModalProps = {
  taskName: string;
  open: boolean;
  toggleModal: () => void;
  setLog: (log: string) => void;
  log: string;
  setSaveLog: (saveLog: string) => void;
};

// TODO:
// Clear log functions to fix
export const TaskModal = (props: TaskModalProps) => {
  const { taskName, open, toggleModal, setLog, log, setSaveLog } = props;
  const cancelButtonRef = useRef(null);

  const clearLogs = () => {
    setLog('');
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        unmount={false}
        initialFocus={cancelButtonRef}
        onClose={toggleModal}
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

          {/* This element is to trick the browser into centering the modal contents. */}
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
            <div className="relative inline-block bg-white rounded overflow-hidden shadow-xl transform transition-all align-middle">
              <div className="py-4 px-6 flex flex-col justify-center items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                  <InformationCircleIcon className="h-8 w-8 text-blue-700" aria-hidden="true" />
                </div>
                <div className="text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg my-4 font-extrabold leading-6 text-gray-700"
                  >
                    {taskName.toUpperCase()}
                  </Dialog.Title>
                  <TerminalOutput
                    taskName={taskName}
                    log={log}
                    inModal={true}
                    setSaveLog={setSaveLog}
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={toggleModal}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={clearLogs}
                >
                  Clear logs
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
