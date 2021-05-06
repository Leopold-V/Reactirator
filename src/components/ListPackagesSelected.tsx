import React, { Dispatch, useContext } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { PackageContext } from './context/PackageContext';
import { actionPackageType } from '../helpers/types';

export const ListPackagesSelected = (
    {type, listPackages, dispatchPackages}: 
    {type: string, listPackages: string[], dispatchPackages: Dispatch<actionPackageType>}) => {
        
    const { dispatchJson } = useContext(PackageContext);

    const removePackages = (e: React.MouseEvent<HTMLElement>): void => {
        dispatchPackages({type : 'REMOVE', payload: {destination: type, name: e.currentTarget.dataset.name}});
        dispatchJson({type : 'REMOVE', payload: {category: type, name: e.currentTarget.dataset.name}});
    }

    return (
        <Droppable droppableId={type}>
        {(provided) => (
            <ul className="w-full min-h-small" ref={provided.innerRef} {...provided.droppableProps}>
            {listPackages.map((ele, i) => (
                <Draggable draggableId={ele} index={i} key={ele}>
                {(provided2) => (    
                    <li 
                        ref={provided2.innerRef}
                        {...provided2.draggableProps}
                        {...provided2.dragHandleProps}
                        className="text-red-700 border-1 bg-red-50 hover:bg-red-200 transition duration-200
                        flex items-center justify-start rounded shadow-md h-9 my-2 w-full"
                    >
                        <button 
                            data-name={ele}
                            className="px-2 h-full border-none focus:bg-red-300 focus:outline-none transition duration-200"
                            onClick={removePackages}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#3f3f3f">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        </button>
                        <div className="text-center w-full overflow-ellipsis px-2">
                        {ele}
                        </div>
                    </li>)}
                </Draggable>
            ))}
            {provided.placeholder}
        </ul>)}
        </Droppable>
    )
}
