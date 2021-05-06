import React, { Dispatch, useContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { actionPackageType, depStateType } from '../helpers/types';
import { PackageContext } from './context/PackageContext';

import { ListPackagesSelected } from './ListPackagesSelected';

export const ListPackages = (
    {listPackages, dispatchPackages}:
    {listPackages: depStateType, dispatchPackages: Dispatch<actionPackageType>}) => {

    const { packageJson, dispatchJson } = useContext(PackageContext);

    const onDragEnd = (result: any) => {
        const { draggableId, source, destination } = result;
        console.log(result);
        
        if (!destination) return;
        if (source.droppableId === destination.droppableId) return;
        dispatchPackages({
            type: 'CHANGE_TYPE',
            payload: {
                destination: destination.droppableId,
                source: source.droppableId,
                name: draggableId
            }
        });
        dispatchJson({
            type : 'ADD',
            payload: {
                category: destination.droppableId,
                name: draggableId,
                version: packageJson[source.droppableId][draggableId]
            }
        });
        dispatchJson({
            type : 'REMOVE',
            payload: {
                category: source.droppableId,
                name: draggableId
            }
        });
    };
        
    
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="mx-10 lg:w-3/5 flex flex-wrap justify-center lg:space-x-6">
                <div className="p-6 w-64 bg-white text-gray-800 rounded shadow">
                    <div className="flex flex-col items-center">
                        <h2 className="font-bold pb-2">Dependencies</h2>
                        <ListPackagesSelected type="dependencies" dispatchPackages={dispatchPackages} listPackages={listPackages.dependencies} />
                    </div>
                </div>
                <div className="p-6 w-64 bg-white text-gray-800 rounded shadow">
                    <div className="flex flex-col items-center">
                        <h2 className="font-bold pb-2">Dev dependencies</h2>
                        <ListPackagesSelected type="devDependencies" dispatchPackages={dispatchPackages} listPackages={listPackages.devDependencies} />
                    </div>
                </div>
            </div>
        </DragDropContext>
    )
}
