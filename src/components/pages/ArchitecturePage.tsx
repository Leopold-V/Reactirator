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
        <TreeFolder structure={structure} dispatch={dispatch} />
        <div className="flex flex-col space-y-8">
          <CreateFolder />
          <CreateComponent />
        </div>
      </div>
    </div>
  );
};
