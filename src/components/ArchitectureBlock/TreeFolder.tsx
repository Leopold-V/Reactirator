import React, { Dispatch } from 'react';
import { FileStructureType, structureStateType } from '../../helpers/types';
import { TreeItem } from './TreeItem';

export const TreeFolder = ({
  structure,
  dispatchStructure,
}: {
  structure: structureStateType;
  dispatchStructure: Dispatch<any>;
}) => {
  const rootItem = structure.filter((ele: FileStructureType) => ele.ancestor === '');

  return (
    <div className="bg-white flex flex-col w-1/2 border-gray-200 shadow text-gray-700 dark:bg-blueGray dark:text-white p-6 rounded-lg hover:shadow-lg transition duration-200">
      <h2 className="font-extrabold text-xl text-center pb-6">Project Structure</h2>
      <ul className="py-2">
        {rootItem.map((ele) => (
          <TreeItem
            key={ele.id}
            id={ele.id}
            structure={structure}
            name={ele.name}
            isFolder={ele.isFolder}
            dispatchStructure={dispatchStructure}
            ancestor={ele.ancestor}
          />
        ))}
      </ul>
    </div>
  );
};
