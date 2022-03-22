import React, { Dispatch } from 'react';

import { FeatureSwitch } from './';
import { formInputType, actionPackageType } from '../../helpers/types';

export const FeaturesList = ({
  input,
  setInput,
  dispatchPackages,
}: {
  input: formInputType;
  setInput: (input: formInputType) => void;
  dispatchPackages: Dispatch<actionPackageType>;
}) => {
  return (
      <div className="flex flex-col w-1/2 bg-white shadow overflow-auto h-96 rounded-md divide-y divide-gray-200">
          <FeatureSwitch
            name="typescript"
            packageName="typescript"
            setInput={setInput}
            input={input}
            dispatchPackages={dispatchPackages}
          >
            <div className="text-gray-700 font-medium">Typescript</div>
            <div className="text-gray-400">A strongly typed programming language.</div>
          </FeatureSwitch>
          <FeatureSwitch
            name="flow"
            packageName="flow-bin"
            setInput={setInput}
            input={input}
            dispatchPackages={dispatchPackages}
          >
            <div className="text-gray-700 font-medium">Flow</div>
            <div className="text-gray-400">A Static Type Checker for JavaScript.</div>
          </FeatureSwitch>
          <FeatureSwitch
            name="prettier"
            packageName="prettier"
            setInput={setInput}
            input={input}
            dispatchPackages={dispatchPackages}
          >
            <div className="text-gray-700 font-medium">Prettier</div>
            <div className="text-gray-400">An opinionated code formatter.</div>
          </FeatureSwitch>
          <FeatureSwitch
            name="sourcemapexplorer"
            packageName="source-map-explorer"
            setInput={setInput}
            input={input}
            dispatchPackages={dispatchPackages}
          >
            <div className="text-gray-700 font-medium">Bundle analyze</div>
            <div className="text-gray-400">Visualize size of files with an interactive zoomable treemap.</div>
          </FeatureSwitch>
          <FeatureSwitch
            name="storybook"
            packageName="storybook"
            setInput={setInput}
            input={input}
            dispatchPackages={dispatchPackages}
          >
            <div className="text-gray-700 font-medium">Storybook</div>
            <div className="text-gray-400">A tool for building UI components and pages in isolation.</div>
          </FeatureSwitch>
          <FeatureSwitch
            name="tailwind"
            packageName="tailwind"
            setInput={setInput}
            input={input}
            dispatchPackages={dispatchPackages}
          >
            <div className="text-gray-700 font-medium">Tailwindcss</div>
            <div className="text-gray-400">A utility-first CSS framework.</div>
          </FeatureSwitch>
          <FeatureSwitch
            name="bootstrap"
            packageName="bootstrap"
            setInput={setInput}
            input={input}
            dispatchPackages={dispatchPackages}
          >
            <div className="text-gray-700 font-medium">Bootstrap</div>
            <div className="text-gray-400">CSS Framework for developing responsive websites.</div>
          </FeatureSwitch>
          <FeatureSwitch
            name="normalize"
            packageName="normalize.css"
            setInput={setInput}
            input={input}
            dispatchPackages={dispatchPackages}
          >
            <div className="text-gray-700 font-medium">Css reset</div>
            <div className="text-gray-400">Reset stylesheet to reduce browser inconsistencies.</div>
          </FeatureSwitch>
      </div>
  );
};
