import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition, RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useHistory } from 'react-router-dom';

export const CreatorMenuModal = ({
  open,
  toggleModal,
}: {
  open: boolean;
  toggleModal: () => void;
}) => {
  const cancelButtonRef = useRef(null);
  const [selected, setSelected] = useState('creatorVite');
  const history = useHistory();

  const handleClick = () => {
    console.log(`/${selected}`);
    history.push(`/${selected}`);
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
            <div className="w-1/2 relative inline-block bg-white rounded overflow-hidden shadow-xl transform transition-all align-middle">
              <div className="flex flex-col justify-center items-center">
                <div className="py-6 px-6">
                  <Dialog.Title className="text-lg leading-6 font-medium text-gray-900">
                    Pick a starter
                  </Dialog.Title>
                </div>
                <div className="border-t border-gray-200 p-0">
                  <dl className="divide-y divide-gray-200">
                    <div className="py-8 px-6">
                      <DependencyModalRadio selectedType={selected} setSelectedType={setSelected} />
                    </div>
                  </dl>
                </div>
                <div className="bg-gray-50 w-full px-4 py-3">
                  <button
                    onClick={handleClick}
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 disabled:opacity-70 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    ref={cancelButtonRef}
                  >
                    Start
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export const DependencyModalRadio = ({
  selectedType,
  setSelectedType,
}: {
  selectedType: string;
  setSelectedType: (selectedType: string) => void;
}) => {
  return (
    <RadioGroup value={selectedType} onChange={setSelectedType}>
      <div className="grid gap-y-4 grid-cols-2 gap-x-4">
        <RadioGroup.Option
          value="creator"
          className={({ checked, active }) =>
            classNames(
              checked ? 'border-transparent' : 'border-gray-300',
              active ? 'border-indigo-500 ring-2 ring-indigo-500' : '',
              'col-span-1 relative bg-white border rounded shadow-sm p-1 flex cursor-pointer focus:outline-none'
            )
          }
        >
          {({ checked, active }) => (
            <div className="w-full">
              <div className="flex justify-center items-center relative">
                <RadioGroup.Label
                  as="span"
                  className="flex justify-between items-center space-x-3 py-2 px-2 mr-2 text-gray-700"
                >
                  <img
                    className="w-10 h-10"
                    src="../assets/logo_starter/cra.svg"
                    alt="logo_starter"
                  />
                  <div>Create-react-app</div>
                </RadioGroup.Label>
                <CheckCircleIcon
                  className={classNames(
                    !checked ? 'invisible' : '',
                    'absolute right-0 top-0 h-5 w-5 text-indigo-600'
                  )}
                  aria-hidden="true"
                />
              </div>
              <div
                className={classNames(
                  active ? 'border' : 'border-2',
                  checked ? 'border-indigo-500' : 'border-transparent',
                  'absolute -inset-px rounded pointer-events-none'
                )}
                aria-hidden="true"
              />
            </div>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option
          value="creatorVite"
          className={({ checked, active }) =>
            classNames(
              checked ? 'border-transparent' : 'border-gray-300',
              active ? 'border-indigo-500 ring-2 ring-indigo-500' : '',
              'col-span-1 relative bg-white border rounded shadow-sm p-1 flex cursor-pointer focus:outline-none'
            )
          }
        >
          {({ checked, active }) => (
            <div className="w-full">
              <div className="flex justify-center items-center relative">
                <RadioGroup.Label
                  as="span"
                  className="flex justify-between items-center space-x-3 py-2 px-2 mr-2 text-gray-700"
                >
                  <img
                    className="w-9 h-9"
                    src="../assets/logo_starter/vite.svg"
                    alt="logo_starter"
                  />
                  <div>Vite</div>
                </RadioGroup.Label>
                <CheckCircleIcon
                  className={classNames(
                    !checked ? 'invisible' : '',
                    'absolute right-0 top-0 h-5 w-5 text-indigo-600'
                  )}
                  aria-hidden="true"
                />
              </div>
              <div
                className={classNames(
                  active ? 'border' : 'border-2',
                  checked ? 'border-indigo-500' : 'border-transparent',
                  'absolute -inset-px rounded pointer-events-none'
                )}
                aria-hidden="true"
              />
            </div>
          )}
        </RadioGroup.Option>
      </div>
    </RadioGroup>
  );
};
