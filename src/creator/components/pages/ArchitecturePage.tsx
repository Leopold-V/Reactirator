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
    <div className="flex w-full justify-center divide-x-2 divide-gray-300 space-x-4">
      <div className="w-1/3">
        <TreeFolder structure={structure} dispatchStructure={dispatch} />
      </div>
      <div className="w-2/3 flex divide-x-2 divide-gray-300">
        <CreateFolder structure={structure} dispatchStructure={dispatch} />
        <CreateComponent structure={structure} dispatchStructure={dispatch} />
      </div>
    </div>
  );
};
