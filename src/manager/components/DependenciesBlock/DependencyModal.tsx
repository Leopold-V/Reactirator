import React, { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { dependencyFoundType } from '../../../manager/helpers/types';

export const DependencyModal = ({ depData, open, toggleModal }: { depData: dependencyFoundType, open: boolean, toggleModal: () => void}) => {
    const cancelButtonRef = useRef(null);

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
            {depData && (
              <div className="w-1/3 relative inline-block bg-white rounded overflow-hidden shadow-xl transform transition-all align-middle">
                <div className="flex flex-col justify-center items-center">
                  <div className="py-5 px-6">
                        <Dialog.Title className="text-lg leading-6 font-medium text-gray-900">
                        {depData.name}
                        </Dialog.Title>
                        <Dialog.Description className="mt-1 max-w-2xl text-sm text-gray-500">
                        {depData.description}
                        </Dialog.Description>
                    </div>
                    <div className="border-t border-gray-200 p-0">
                      <dl className="divide-y divide-gray-200">
                        <div className="py-5 grid grid-cols-3 gap-4 px-6">
                            <dt className="text-sm font-medium text-gray-500">Version</dt>
                            <dd className="text-sm text-gray-900 col-span-2">{depData.version}</dd>
                        </div>
                        <div className="py-5 grid grid-cols-3 gap-4 px-6">
                            <dt className="text-sm font-medium text-gray-500">Npm score</dt>
                            <dd className="text-sm text-gray-900 col-span-2">{depData.score.toFixed(3)}</dd>
                        </div>
                        <div className="py-5 grid grid-cols-3 gap-4 px-6">
                          <dt className="text-sm font-medium text-gray-500">Links</dt>
                          <dd className="text-sm text-gray-900 col-span-2">
                            <a
                              href={`${depData.links.npm}`}
                              className="font-semibold hover:text-indigo-600 transition duration-200"
                            >
                              Npm
                            </a>
                            &nbsp;-&nbsp;
                            <a
                              href={`${depData.links.repository}`}
                              className="font-semibold hover:text-indigo-600 transition duration-200"
                            >
                              Github
                            </a>
                          </dd>
                        </div>
                      </dl>
                </div>
                <div className="bg-gray-50 w-full px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    ref={cancelButtonRef}
                  >
                    Install
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={toggleModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              </div>
               )}
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    );
}
