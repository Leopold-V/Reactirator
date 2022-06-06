import React from 'react';
import { MarkdownWrapper } from '../../../common/MarkdownWrapper';

export const ComponentPreview = ({ componentCode }: { componentCode: string }) => {
  return (
    <>
      <h2 className="">Component Preview:</h2>
      <MarkdownWrapper content={'```js\n' + componentCode + '\n```'} />
    </>
  );
};
