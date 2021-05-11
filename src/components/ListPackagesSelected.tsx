import React, { Dispatch } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { actionPackageType } from '../helpers/types';
import { ItemPackageSelected } from './ItemPackageSelected';

export const ListPackagesSelected = (
    {type, listPackages, dispatchPackages}: 
    {type: 'dependencies' | 'devDependencies', listPackages: string[], dispatchPackages: Dispatch<actionPackageType>}) => {

    return (
        <Droppable droppableId={type}>
            {(provided) => (
                <ul className="w-full min-h-small" ref={provided.innerRef} {...provided.droppableProps}>
                {listPackages.length === 0 && <div className="pt-2 text-center text-sm text-gray-400">Empty list</div>}
                {listPackages.map((ele, index) => (
                    <ItemPackageSelected type={type} packageName={ele} index={index} dispatchPackages={dispatchPackages} />
                ))}
                {provided.placeholder}
            </ul>)}
        </Droppable>
    )
}
