import React from 'react';
import { MarkdownWrapper } from './MarkdownWrapper';

export const ReadmePreview = ({ readme }: { readme: string }) => {
  return (
    <div className="py-8 px-2 w-full min-h-big">
      <MarkdownWrapper content={readme} />
    </div>
  );
};
