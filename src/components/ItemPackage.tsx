import React, { Dispatch } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { actionPackageType } from '../helpers/types';
import { ButtonRemovePackage } from './ButtonRemovePackage';

export const ItemPackage = ({
  type,
  packageName,
  index,
  dispatchPackages,
}: {
  type: 'dependencies' | 'devDependencies';
  packageName: string;
  index: number;
  dispatchPackages: Dispatch<actionPackageType>;
}) => {
  return (
    <Draggable draggableId={packageName} index={index} key={packageName}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="text-white border-1 text-sm font-semibold bg-indigo-500 opacity-90 hover:opacity-80 transition duration-200
                flex items-center justify-start rounded shadow h-9 my-2 w-full"
        >
          <ButtonRemovePackage
            type={type}
            packageName={packageName}
            dispatchPackages={dispatchPackages}
          />
          <div className="text-center w-full overflow-ellipsis px-2">{packageName}</div>
        </li>
      )}
    </Draggable>
  );
};
