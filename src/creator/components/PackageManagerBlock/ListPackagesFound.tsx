import React, { Dispatch, useRef, useState } from 'react';
import { useModal } from '../../../hooks/useModal';
import { dependencyFoundType } from '../../../manager/helpers/types';

import { DependencyModalCreator } from './';

import { actionPackageType, listPackageType } from '../../helpers/types';

import { ItemPackageFound } from './ItemPackageFound';

export const ListPackagesFound = ({
  results,
  dispatchPackages,
}: {
  results: listPackageType;
  dispatchPackages: Dispatch<actionPackageType>;
}) => {
  const ref = useRef(null);

  const [open, toggleModal] = useModal();
  const [depData, setDepData] = useState<dependencyFoundType>(null);

  return (
    <>
      <ul
        className="absolute left-1/2 -translate-x-1/2 w-7/12 z-10 text-gray-800 max-h-medium overflow-y-scroll shadow"
        ref={ref}
      >
        {results.map((ele) => (
          <ItemPackageFound
            key={ele.name}
            packageData={ele}
            dispatchPackages={dispatchPackages}
            dep={ele}
            setDepData={setDepData}
            toggleModal={toggleModal}
          />
        ))}
      </ul>
      <DependencyModalCreator dispatchPackages={dispatchPackages} depData={depData} open={open} toggleModal={toggleModal} />
    </>
  );
};
