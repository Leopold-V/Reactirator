import React from 'react';

import { formInputType } from '../../helpers/types';

import { Title } from '../../../common/Typo';
import { FeaturesList } from '../FeaturesBlock';

export const FeaturesPage = ({
  input,
  setInput,
}: {
  input: formInputType;
  setInput: (input: formInputType) => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full space-y-2">
      <Title title="Features" />
      <FeaturesList input={input} setInput={setInput} />
    </div>
  );
};
