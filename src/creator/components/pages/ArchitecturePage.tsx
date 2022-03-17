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
    <div className="flex w-full space-x-8">
      <div className="flex-grow">
        <TreeFolder structure={structure} dispatchStructure={dispatch} />
      </div>
      <div className="flex flex-col w-1/2 space-y-8">
        <CreateFolder structure={structure} dispatchStructure={dispatch} />
        <CreateComponent structure={structure} dispatchStructure={dispatch} />
      </div>
    </div>
  );
};
