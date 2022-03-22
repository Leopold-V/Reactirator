import React, { Dispatch } from 'react';
import { Title } from '../../../common/Typo';
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
      <div className="w-full shadow-sm bg-white rounded-sm flex flex-col h-96 overflow-y-auto">
        <Title title="Project Structure" />
        <ul className="py-2 w-full">
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
