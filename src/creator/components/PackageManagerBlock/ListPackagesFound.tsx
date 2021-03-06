import useMouse from '@react-hook/mouse-position';
import React, { Dispatch, useRef, useState } from 'react';

import { actionPackageType, listPackageType, packageFoundType } from '../../helpers/types';

import { ItemPackageFound } from './ItemPackageFound';
import { ItemPackageTooltip } from './ItemPackageTooltip';

export const ListPackagesFound = ({
  results,
  dispatchPackages,
}: {
  results: listPackageType;
  dispatchPackages: Dispatch<actionPackageType>;
}) => {
  const ref = useRef(null);

  const [isShown, setIsShown] = useState(false);
  const [data, setData] = useState<packageFoundType | null>(null);

  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100,
  });

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
            setIsShown={setIsShown}
            setData={setData}
          />
        ))}
      </ul>
      <ItemPackageTooltip data={data} mouse={mouse} isShown={isShown} />
    </>
  );
};
