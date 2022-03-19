import React from 'react';
import { ScriptItem } from './ScriptItem';

export const ListScripts = ({ scripts }: { scripts: Record<string, string> }) => {
  return (
    <ul className="text-sm flex flex-wrap justify-center items-center py-4">
      {Object.entries(scripts).map((script, i) => {
        return <ScriptItem key={i} script={script} />;
      })}
    </ul>
  );
};
