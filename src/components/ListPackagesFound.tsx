import React, { Dispatch } from 'react';
import { actionPackageType, listPackageType } from '../helpers/types';
import { ItemPackageFound } from './ItemPackageFound';

export const ListPackagesFound = ({
  results,
  dispatchPackages,
}: {
  results: listPackageType;
  dispatchPackages: Dispatch<actionPackageType>;
}) => {

  return (
    <ul className="absolute w-11/12 z-10 top-23 max-h-medium overflow-y-auto shadow">
      {results.map((ele) => (
        <ItemPackageFound
          key={ele.name}
          title={ele.name}
          version={ele.version}
          dispatchPackages={dispatchPackages}
        />
      ))}
    </ul>
  );
};
