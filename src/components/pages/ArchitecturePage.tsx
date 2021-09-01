import React, { Dispatch } from 'react';
import { structureStateType } from '../../helpers/types';
import { CreateComponent, CreateFolder, TreeFolder } from '../ArchitectureBlock';

export const ArchitecturePage = ({
  structure,
  dispatch,
}: {
  structure: structureStateType;
  dispatch: Dispatch<any>;
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex space-x-8">
        <TreeFolder structure={structure} dispatchStructure={dispatch} />
        <div className="flex flex-col flex-grow space-y-8">
          <CreateFolder structure={structure} dispatchStructure={dispatch} />
          <CreateComponent structure={structure} dispatchStructure={dispatch} />
        </div>
      </div>
    </div>
  );
};
