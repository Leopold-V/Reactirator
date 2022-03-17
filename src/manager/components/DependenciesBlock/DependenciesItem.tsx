import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectDep } from '../../../slices/dependenciesSlice';

export const DependenciesItem = ({ depName, depVersion }: { depName: string, depVersion: string }) => {
    const depSelected = useAppSelector((state) => state.dependencies.depSelected);
    const dispatch = useAppDispatch();

    const handleClick = () => {
      dispatch(selectDep(depName));
    }

  return (
    <li>
    <button onClick={handleClick} 
    className={`${depSelected === depName ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white text-gray-700 hover:bg-gray-50'} cursor-pointer flex justify-between items-center w-full h-full px-6 py-4 transition duration-200`}
    >
      <div className="overflow-hidden overflow-ellipsis w-[13rem] whitespace-nowrap">
        {depName}
      </div>
      <div>{depVersion}</div>
    </button>
  </li>
  )
};