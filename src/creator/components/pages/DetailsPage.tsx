import React from 'react';

import { formInputType } from '../../helpers/types';

import { GithubSection } from '../GithubBlock';
import { DetailsForm } from '../DetailsBlock';

export const DetailsPage = ({
  input,
  setInput,
}: {
  input: formInputType;
  setInput: (input: formInputType) => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full space-y-2">
        <DetailsForm input={input} setInput={setInput} />
        <GithubSection />
    </div>
  );
};
