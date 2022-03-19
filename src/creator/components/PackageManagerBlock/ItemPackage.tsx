import React, { Dispatch } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { actionPackageType } from '../../helpers/types';
import { ButtonRemovePackage } from '../Buttons';

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
      {(provided, snapshot) => {
        console.log(snapshot.isDragging);
        return (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="bg-indigo-600 text-gray-200 border-1 text-sm font-semibold opacity-90 hover:opacity-80 transition duration-200
                 rounded flex items-center justify-start shadow h-9 my-2 w-full"
          >
            <ButtonRemovePackage
              type={type}
              packageName={packageName}
              dispatchPackages={dispatchPackages}
            />
            <div className="text-center w-full px-2 overflow-ellipsis">{packageName}</div>
          </li>
        );
      }}
    </Draggable>
  );
};
