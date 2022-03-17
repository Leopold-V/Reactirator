import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectDep } from '../../../slices/dependenciesSlice';

export const DependenciesItem = ({ depName, depVersion, isDevDep }: { depName: string, depVersion: string, isDevDep: boolean }) => {
    const depSelectedName = useAppSelector((state) => state.dependencies.depSelected.depName);
    const dispatch = useAppDispatch();

    const handleClick = () => {
      dispatch(selectDep({ depName: depName, depVersion: depVersion, isDevDep: isDevDep}));
    }

  return (
    <li>
    <button onClick={handleClick} 
    className={`${depSelectedName === depName ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white text-gray-700 hover:bg-gray-50'} cursor-pointer flex justify-between items-center w-full h-full px-6 py-4 transition duration-200`}
    >
      <div className="overflow-hidden font-medium text-sm overflow-ellipsis w-[11rem] whitespace-nowrap">
        {depName}
      </div>
      <div className="text-sm">{depVersion}</div>
    </button>
  </li>
  )
};