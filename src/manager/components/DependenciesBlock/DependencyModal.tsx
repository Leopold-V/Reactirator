import { ipcRenderer, shell } from 'electron';
import React, { Fragment, MouseEvent, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { dependencyFoundType } from '../../../manager/helpers/types';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { installDep } from '../../../slices/dependenciesSlice';

import { DependencyModalRadio } from './DependencyModalRadio';
import { ScoreNpmPophover } from './ScoreNpmPophover';

export const DependencyModal = ({
  depData,
  open,
  toggleModal,
}: {
  depData: dependencyFoundType;
  open: boolean;
  toggleModal: () => void;
}) => {
  const cancelButtonRef = useRef(null);
  const [selectedType, setSelectedType] = useState('Dependency');
  const [popHoverOpen, setPopHoverOpen] = useState(false);
  const projectPath = useAppSelector((state) => state.project.projectPath);
  const dependencies = useAppSelector((state) => state.dependencies);
  const dispatch = useAppDispatch();

  const handleInstallDep = () => {
    console.log(selectedType);
    ipcRenderer.send('dep-install', {
      path: projectPath,
      depName: depData.name,
      isDevDep: selectedType === 'devDependency' ? true : false,
      version: depData.version,
    });
    dispatch(
      installDep({
        name: depData.name,
        version: depData.version,
        status: 'Pending',
        isDevDep: selectedType === 'devDependency' ? true : false,
      })
    );
  };

  const showNpmScore = () => {
    setPopHoverOpen(true);
  };

  const hideNpmScore = () => {
    setPopHoverOpen(false);
  };

  const openLinkExternal = (e: MouseEvent<HTMLButtonElement>) => {
    shell.openExternal(e.currentTarget.dataset.link);
  }

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
                        <dt className="text-sm flex flex-row">
                          <span className="font-medium text-gray-500">Npm score</span>
                          <span
                            onMouseEnter={showNpmScore}
                            onMouseLeave={hideNpmScore}
                            className="text-indigo-500 hover:text-indigo-700 cursor-pointer font-semibold transition duration-200"
                          >
                            &nbsp;(?)
                          </span>
                          <ScoreNpmPophover scoreDetail={depData.scoreDetail} open={popHoverOpen} />
                        </dt>
                        <dd className="text-sm text-gray-900 col-span-2">
                          {depData.score.toFixed(3)}
                        </dd>
                      </div>
                      <div className="py-5 grid grid-cols-3 gap-4 px-6">
                        <dt className="text-sm font-medium text-gray-500">Links</dt>
                        <dd className="text-sm text-gray-900 col-span-2">
                          <button
                          onClick={openLinkExternal}
                            data-link={`${depData.links.npm}`}
                            className="font-semibold hover:text-indigo-600 transition duration-200"
                          >
                            Npm
                          </button>
                          &nbsp;-&nbsp;
                          <button
                            onClick={openLinkExternal}
                            data-link={`${depData.links.repository}`}
                            className="font-semibold hover:text-indigo-600 transition duration-200"
                          >
                            Github
                          </button>
                        </dd>
                      </div>
                      <div className="py-5 px-6">
                        <DependencyModalRadio
                          selectedType={selectedType}
                          setSelectedType={setSelectedType}
                        />
                      </div>
                    </dl>
                  </div>
                  <div className="bg-gray-50 w-full px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      disabled={
                        dependencies.dependencies[depData.name]?.status === 'Pending' ||
                        dependencies.devDependencies[depData.name]?.status === 'Pending'
                      }
                      onClick={handleInstallDep}
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 disabled:opacity-70 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
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
};
