import React from 'react';
import { Card } from '../../../common/Card';
import { ScriptSection } from '../ScriptBlock';

export const CommandPage = () => {
  return (
    <div className="flex flex-col w-full space-y-8">
      <div className="align-baseline">
        <ScriptSection />
      </div>
      <Card>
        <h2 className="text-center"></h2>
      </Card>
    </div>
  );
};
