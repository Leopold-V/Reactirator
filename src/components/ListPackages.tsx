import React, { Dispatch } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { actionPackageType, depStateType } from '../helpers/types';

import { ListPackagesSelected } from './ListPackagesSelected';


export const ListPackages = (
    {listPackages, dispatchPackages}:
    {listPackages: depStateType, dispatchPackages: Dispatch<actionPackageType>}) => {

    const onDragEnd = (result: any) => {
        const { draggableId, source, destination } = result;
    /*
        if (!destination) return;
        if (source.index === destination.index && source.droppableId === destination.droppableId) return;
        if (destination.droppableId === 'trash') {
            dispatchPackages({ type: 'DELETE', payload: { name: draggableId, category: source.droppableId } });
        } else if (destination.droppableId === 'board') {
            dispatchPackages({ type: 'REORDER_CARD', payload: { source, destination } });
        } else {
            if (source.droppableId === destination.droppableId) {
                dispatchPackages({ type: 'CHANGE_LINE', payload: { source, destination } });
            } else {
                dispatchPackages({ type: 'CHANGE_COLUMN', payload: { source, destination } });
            }
         }*/
    };
        
    
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="mx-10 w-full lg:w-3/5 flex flex-wrap justify-center lg:space-x-6">
                <div className="p-6 flex-grow bg-white text-gray-800 rounded shadow">
                    <div className="flex flex-col items-center">
                        <h2 className="font-bold">Dependencies</h2>
                        <ListPackagesSelected dispatchPackages={dispatchPackages} listPackages={listPackages.dependencies} />
                    </div>
                </div>
                <div className="p-6 flex-grow bg-white text-gray-800 rounded shadow">
                    <div className="flex flex-col items-center">
                        <h2 className="font-bold">Dev dependencies</h2>
                        <ListPackagesSelected dispatchPackages={dispatchPackages} listPackages={listPackages.devDependencies} />
                    </div>
                </div>
            </div>
        </DragDropContext>
    )
}
