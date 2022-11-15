import React from 'react';

import { formInputType, starterType } from '../../helpers/types';

import { Title } from '../../../common/Typo';
import { FeaturesList } from '../FeaturesBlock';
import { featuresListVite, featuresListCRA } from '../../helpers/featuresLists';

export const FeaturesPage = ({
  input,
  setInput,
  starter
}: {
  input: formInputType;
  setInput: (input: formInputType) => void;
  starter: starterType
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full space-y-2">
      <Title title="Features" />
      <FeaturesList input={input} setInput={setInput} listFeatures={starter === 'vite' ? featuresListVite : featuresListCRA} />
    </div>
  );
};
