import React, { Dispatch } from 'react';
import { Card } from '../../../common/Card';
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
    <Card height="100%">
      <div className="w-full">
        <h2 className="font-extrabold text-xl text-center pb-6">Project Structure</h2>
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
    </Card>
  );
};
