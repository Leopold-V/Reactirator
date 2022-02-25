import React from 'react';
import { ButtonRemoveScript } from '../Buttons';

export const ScriptItem = ({ script }: { script: any[] }) => {
  return (
    <li className="m-1 text-gray-700 bg-blue-50 rounded shadow flex items-center overflow-hidden">
      <ButtonRemoveScript name={script[0]} />
      <div className="px-3 py-1 bg-blue-50">
        <span className="font-bold">{script[0]}:</span> {script[1]}
      </div>
    </li>
  );
};
