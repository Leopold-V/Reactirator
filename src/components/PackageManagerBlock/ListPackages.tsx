import React, { Dispatch } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { actionPackageType, depStateType } from '../../helpers/types';
import { CardDependencies } from './CardDependencies';
import { usePackageJson } from '../Contexts/PackageJsonProvider';

import { ListPackagesSelected } from './ListPackagesSelected';

export const ListPackages = ({
  listPackages,
  dispatchPackages,
}: {
  listPackages: depStateType;
  dispatchPackages: Dispatch<actionPackageType>;
}) => {
  const { packageJson, dispatchJson } = usePackageJson();

  const onDragEnd = (result: DropResult) => {
    const { draggableId, source, destination } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;
    dispatchPackages({
      type: 'CHANGE_TYPE',
      payload: {
        // @ts-ignores
        destination: destination.droppableId,
        source: source.droppableId,
        name: draggableId,
      },
    });
    dispatchJson({
      type: 'ADD',
      payload: {
        category: destination.droppableId,
        name: draggableId,
        version: packageJson[source.droppableId][draggableId],
      },
    });
    dispatchJson({
      type: 'REMOVE',
      payload: {
        category: source.droppableId,
        name: draggableId,
      },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col lg:flex-row lg:justify-between items-center">
        <CardDependencies title="Dependencies" listPackages={listPackages.dependencies}>
          <ListPackagesSelected
            type="dependencies"
            dispatchPackages={dispatchPackages}
            listPackages={listPackages.dependencies}
          />
        </CardDependencies>
        <CardDependencies title="Dev dependencies" listPackages={listPackages.devDependencies}>
          <ListPackagesSelected
            type="devDependencies"
            dispatchPackages={dispatchPackages}
            listPackages={listPackages.devDependencies}
          />
        </CardDependencies>
      </div>
    </DragDropContext>
  );
};
