import React from 'react';
import { ButtonRemoveScript } from '../Buttons';

export const ScriptItem = ({ script }: { script: any[] }) => {
  return (
      <li className="inline-flex m-1 space-x-1 overflow-hidden rounded-full items-center px-3 py-2 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700">
        <span className="font-bold">{script[0]}: &nbsp;</span> {script[1]}
        <ButtonRemoveScript name={script[0]} />
      </li>
  );
};