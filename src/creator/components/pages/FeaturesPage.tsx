import React from 'react'

import { formInputType } from '../../helpers/types';

import { Title } from '../../../common/Typo';
import { FeaturesList } from '../FeaturesBlock';
import { useDependencies } from '../Contexts/dependenciesProvider';

export const FeaturesPage = ({
    input,
    setInput,
  }: {
    input: formInputType;
    setInput: (input: formInputType) => void;
  }) => {
  const { dispatch } = useDependencies();

  return (
    <div className="flex flex-col items-center justify-center w-full space-y-2">
        <Title title="Features" />
        <FeaturesList input={input} setInput={setInput} dispatchPackages={dispatch} />
    </div>
  )
}
