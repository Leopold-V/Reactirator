import React, { Dispatch } from 'react';

import FormSection from './FormSection';
import Checkbox from './Checkbox';
import { formInputType, actionPackageType } from '../helpers/types';

export const FormCustomProject = ({
  input,
  setInput,
  dispatchPackages
}: {
  input: formInputType;
  setInput: (input: formInputType) => void;
  dispatchPackages: Dispatch<actionPackageType>;
}) => {

  return (
    <div className="bg-white px-2 pb-2 rounded shadow">
      <h2 className="font-extrabold text-gray-700 text-xl py-6 text-center">Customization</h2>
      <div className="flex flex-col items-center space-y-2">
        <FormSection title="Development">
          <Checkbox name="typescript" packageName="typescript" setInput={setInput} input={input} dispatchPackages={dispatchPackages}>
            Typescript
          </Checkbox>
          <Checkbox name="prettier" packageName="prettier" setInput={setInput} input={input} dispatchPackages={dispatchPackages}>
            Prettier
          </Checkbox>
          <Checkbox name="flow" packageName="flow-bin" setInput={setInput} input={input} dispatchPackages={dispatchPackages}>
            Flow
          </Checkbox>
        </FormSection>
        <FormSection title="Styles">
          <Checkbox
            name="tailwind"
            packageName="@tailwindcss/postcss7-compat"
            setInput={setInput}
            input={input} 
            dispatchPackages={dispatchPackages}
          >
            Tailwind
          </Checkbox>
          <Checkbox name="bootstrap" packageName="bootstrap" setInput={setInput} input={input} dispatchPackages={dispatchPackages}>
            Bootstrap
          </Checkbox>
          <Checkbox name="normalize" packageName="normalize.css" setInput={setInput} input={input} dispatchPackages={dispatchPackages}>
            CSS reset
          </Checkbox>
        </FormSection>
        <FormSection title="Tools">
          <Checkbox
            name="sourcemapexplorer"
            packageName="source-map-explorer"
            setInput={setInput}
            input={input} dispatchPackages={dispatchPackages}
          >
            source-map-explorer
          </Checkbox>
          <Checkbox name="storybook" packageName="storybook" setInput={setInput} input={input} dispatchPackages={dispatchPackages}>
            Storybook
          </Checkbox>
        </FormSection>
      </div>
    </div>
  );
};
