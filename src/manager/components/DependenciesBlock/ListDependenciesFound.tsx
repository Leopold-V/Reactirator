import React, { useRef, useState } from 'react';

import { dependencyFoundType } from '../../../manager/helpers/types';
import { useModal } from '../../../hooks/useModal';

import { DependencyItemFound } from './DependencyItemFound';
import { DependencyModal } from './DependencyModal';

export const ListDependenciesFound = ({ results }: { results: dependencyFoundType[] }) => {
  const [open, toggleModal] = useModal();
  const [depData, setDepData] = useState<dependencyFoundType>(null);
  const ref = useRef(null);

  return (
    <>
      <ul
        className="absolute w-5/12 z-10 text-gray-800 top-23 max-h-medium overflow-y-scroll shadow"
        ref={ref}
      >
        {results.map((ele: dependencyFoundType) => (
          <DependencyItemFound key={ele.name} dep={ele} setDepData={setDepData} toggleModal={toggleModal} />
        ))}
      </ul>
      <DependencyModal depData={depData} open={open} toggleModal={toggleModal} />
    </>
  );
};
