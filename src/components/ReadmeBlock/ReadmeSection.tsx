import React, { useState } from 'react';
import { ReadmeEdit } from './ReadmeEdit';
import { ReadmeHeader } from './ReadmeHeader';
import { ReadmePreview } from './ReadmePreview';

export const ReadmeSection = ({
  readme,
  setReadme,
}: {
  readme: string;
  setReadme: (input: any) => void;
}) => {
  const [tab, setTab] = useState<string>('Edit');

  return (
    <div
      className="bg-blueGray rounded shadow hover:shadow-lg transition duration-200 p-6 w-full"
      style={{ width: '600px' }}
    >
      <ReadmeHeader tab={tab} setTab={setTab} />
      <div className="w-full">
        {tab === 'Edit' ? (
          <ReadmeEdit readme={readme} setReadme={setReadme} />
        ) : (
          <ReadmePreview readme={readme} />
        )}
      </div>
    </div>
  );
};
