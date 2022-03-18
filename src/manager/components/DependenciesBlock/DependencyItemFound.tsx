import { CheckIcon } from '@heroicons/react/outline';
import React from 'react';
import { useAppSelector } from '../../../hooks';
import { dependencyFoundType } from '../../../manager/helpers/types';

export const DependencyItemFound = ({
  dep,
  setDepData,
  toggleModal
}: {
  dep: dependencyFoundType;
  setDepData: (dep: dependencyFoundType) => void;
  toggleModal: () => void
}) => {
  const dependencies = useAppSelector((state) => state.dependencies);

  const handleOpen = async () => {
    setDepData(dep);
    toggleModal();
  };

  return (
    <button
      onClick={handleOpen}
      className='disabled:bg-gray-100 disabled:hover:bg-gray-100 bg-white hover:bg-gray-50 flex items-center justify-between w-full h-9 relative text-sm px-2'
      disabled={!!dependencies.dependencies[dep.name] || !!dependencies.dependencies[dep.name]}
    >
      <div>
        {dep.name}
      </div>
      <div className="h-5 w-5 text-indigo-600">
        {(dependencies.dependencies[dep.name] || dependencies.dependencies[dep.name]) && <CheckIcon />}
      </div>
    </button>
  );
};
