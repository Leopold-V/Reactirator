// eslint-disable-next-line import/named
import React from 'react';
import { packageFoundType } from '../../helpers/types';

export const ItemPackageTooltip = ({
  data,
  mouse,
  isShown,
}: {
  data: packageFoundType;
  mouse: any;
  isShown: boolean;
}) => {
  if (!isShown) return null;
  return (
    <div
      style={{ bottom: -mouse.y + 10, left: mouse.x + 30 }}
      className={`absolute z-50 text-white text-sm bg-gray-700 w-56 opacity-95 p-2 rounded flex flex-col justify-start items-center shadow`}
    >
      <h2 className="text-center font-bold">
        {data.name}@{data.version}
      </h2>
      <p className="text-center">{data.description}</p>
      <p className="font-bold text-indigo-500">Npm score: {data.score.toPrecision(3)}</p>
    </div>
  );
};
