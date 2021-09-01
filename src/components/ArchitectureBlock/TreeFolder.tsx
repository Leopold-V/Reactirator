import React, { Dispatch } from 'react';
import { structureStateType } from '../../helpers/types';
import { TreeItem } from './TreeItem';

export const TreeFolder = ({
  structure,
  dispatch,
}: {
  structure: structureStateType;
  dispatch: Dispatch<any>;
}) => {

  const rootItem = structure.filter((ele) => !ele.ancestor);

  return (
    <div className="bg-white justify-center border-gray-200 shadow text-gray-700 dark:bg-blueGray dark:text-white p-6 rounded-lg flex flex-col hover:shadow-lg transition duration-200">
      <h2 className="font-extrabold text-xl text-center pb-6">Project Structure</h2>
        <ul className="py-2">
            {rootItem.map((ele) => <TreeItem key={ele.name} structure={structure} name={ele.name} isFolder={ele.isFolder} />)}
        </ul>
    </div>
  );
};
