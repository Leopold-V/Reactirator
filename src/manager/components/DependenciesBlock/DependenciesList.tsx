import React from 'react'

import { useAppSelector } from '../../../hooks';

import { DependenciesItem } from './DependenciesItem'

export const DependenciesList = () => {
  const dependencies = useAppSelector((state) => state.dependencies);

  return (
    <ul className="h-[26rem] w-full flex flex-col divide-y divide-gray-200 overflow-y-auto">
    {Object.entries(dependencies.dependencies).map((ele) => (
      <DependenciesItem key={ele[0]} depName={ele[0]} depVersion={ele[1].version} isDevDep={false} />
    ))}
    {Object.entries(dependencies.devDependencies).map((ele) => (
      <DependenciesItem key={ele[0]} depName={ele[0]} depVersion={ele[1].version} isDevDep={true} />
    ))}
  </ul>
  )
};