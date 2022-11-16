import React from 'react';

import { featureType, formInputType } from '../../helpers/types';
import { FeatureSwitch } from './';

export const FeaturesList = ({
  input,
  setInput,
  listFeatures,
}: {
  input: formInputType;
  setInput: (input: formInputType) => void;
  listFeatures: featureType[];
}) => {
  return (
    <div className="flex flex-col w-1/2 bg-white shadow overflow-auto h-96 rounded-md divide-y divide-gray-200">
      {listFeatures.map((feature) => (
        <FeatureSwitch
          key={feature.name}
          name={feature.name}
          packageName={feature.packageName}
          setInput={setInput}
          input={input}
        >
          <div className="flex items-center text-gray-700 font-medium">{feature.title}</div>
          <div className="text-gray-400">{feature.description}</div>
        </FeatureSwitch>
      ))}
    </div>
  );
};
