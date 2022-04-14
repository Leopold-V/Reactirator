import React from 'react';

import { FeatureSwitch } from './';
import { formInputType } from '../../helpers/types';

export const FeaturesList = ({
  input,
  setInput,
}: {
  input: formInputType;
  setInput: (input: formInputType) => void;
}) => {
  return (
    <div className="flex flex-col w-1/2 bg-white shadow overflow-auto h-96 rounded-md divide-y divide-gray-200">
      {featuresList.map((feature) => (
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

type featureType = {
  title: string;
  description: string;
  name: string;
  packageName: string;
  link: string;
};

const featuresList: featureType[] = [
  {
    title: 'Typescript',
    description: 'A strongly typed programming language.',
    name: 'typescript',
    packageName: 'typescript',
    link: 'https://www.typescriptlang.org/',
  },
  {
    title: 'Flow',
    description: 'A Static Type Checker for JavaScript.',
    name: 'flow',
    packageName: 'flow-bin',
    link: 'https://flow.org/',
  },
  {
    title: 'Prettier',
    description: 'An opinionated code formatter.',
    name: 'prettier',
    packageName: 'prettier',
    link: 'https://prettier.io/',
  },
  {
    title: 'Bundle analyze',
    description: 'Visualize size of files with an interactive zoomable treemap.',
    name: 'sourcemapexplorer',
    packageName: 'source-map-explorer',
    link: 'https://github.com/danvk/source-map-explorer',
  },
  {
    title: 'Storybook',
    description: 'A tool for building UI components and pages in isolation.',
    name: 'storybook',
    packageName: 'storybook',
    link: 'https://storybook.js.org/',
  },
  {
    title: 'Tailwindcss',
    description: 'A utility-first CSS framework.',
    name: 'tailwind',
    packageName: 'tailwind',
    link: 'https://tailwindcss.com/',
  },
  {
    title: 'Bootstrap',
    description: 'CSS Framework for developing responsive websites.',
    name: 'bootstrap',
    packageName: 'bootstrap',
    link: 'https://getbootstrap.com/',
  },
  {
    title: 'Css reset',
    description: 'Reset stylesheet to reduce browser inconsistencies.',
    name: 'normalize',
    packageName: 'normalize.css',
    link: 'https://necolas.github.io/normalize.css/',
  },
];
