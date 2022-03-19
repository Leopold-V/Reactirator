import React, { Dispatch } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { actionPackageType } from '../../helpers/types';
import { ItemPackage } from '.';

export const ListPackagesSelected = ({
  type,
  listPackages,
  dispatchPackages,
}: {
  type: 'dependencies' | 'devDependencies';
  listPackages: { name: string; size: number }[];
  dispatchPackages: Dispatch<actionPackageType>;
}) => {
  return (
    <Droppable droppableId={type}>
      {(provided) => (
        <ul className="text-center w-3/4 min-h-small" ref={provided.innerRef} {...provided.droppableProps}>
          {listPackages.length === 0 && (
            <div className="pt-2 text-center text-sm text-gray-400">Empty list</div>
          )}
          {listPackages.map((ele, index) => (
            <ItemPackage
              type={type}
              packageName={ele.name}
              key={ele.name}
              index={index}
              dispatchPackages={dispatchPackages}
            />
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};
