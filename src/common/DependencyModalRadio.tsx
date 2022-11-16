/* This example requires Tailwind CSS v2.0+ */
import React from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/solid';

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
          value="Dependency"
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
                <RadioGroup.Label as="span" className="block py-2 px-2 mr-2 text-sm text-gray-700">
                  Dependency
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
          value="devDependency"
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
                <RadioGroup.Label as="span" className="block py-2 px-2 mr-2 text-sm text-gray-700">
                  devDependency
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
