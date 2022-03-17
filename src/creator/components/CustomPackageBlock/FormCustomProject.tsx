import React, { Dispatch } from 'react';

import { FormSection } from './FormSection';
import { SwitchPackage } from './SwitchPackage';
import { formInputType, actionPackageType } from '../../helpers/types';
import { Card } from '../../../common/Card';

export const FormCustomProject = ({
  input,
  setInput,
  dispatchPackages,
}: {
  input: formInputType;
  setInput: (input: formInputType) => void;
  dispatchPackages: Dispatch<actionPackageType>;
}) => {
  return (
    <Card>
      <h2 className="font-extrabold text-xl pb-4 text-center">Customization</h2>
      <div className="flex space-x-2">
        <FormSection title="Type checker">
          <SwitchPackage
            name="typescript"
            packageName="typescript"
            setInput={setInput}
            input={input}
            dispatchPackages={dispatchPackages}
          >
            Typescript
          </SwitchPackage>
          <SwitchPackage
            name="flow"
            packageName="flow-bin"
            setInput={setInput}
            input={input}
            dispatchPackages={dispatchPackages}
          >
            Flow
          </SwitchPackage>
        </FormSection>
        <FormSection title="Styles">
          <SwitchPackage
            name="tailwind"
            packageName="tailwind"
            setInput={setInput}
            input={input}
            dispatchPackages={dispatchPackages}
          >
            Tailwind
          </SwitchPackage>
          <SwitchPackage
            name="bootstrap"
            packageName="bootstrap"
            setInput={setInput}
            input={input}
            dispatchPackages={dispatchPackages}
          >
            Bootstrap
          </SwitchPackage>
          <SwitchPackage
            name="normalize"
            packageName="normalize.css"
            setInput={setInput}
            input={input}
            dispatchPackages={dispatchPackages}
          >
            CSS reset
          </SwitchPackage>
        </FormSection>
        <FormSection title="Tools">
          <SwitchPackage
            name="prettier"
            packageName="prettier"
            setInput={setInput}
            input={input}
            dispatchPackages={dispatchPackages}
          >
            Prettier
          </SwitchPackage>
          <SwitchPackage
            name="sourcemapexplorer"
            packageName="source-map-explorer"
            setInput={setInput}
            input={input}
            dispatchPackages={dispatchPackages}
          >
            Bundle analyze
          </SwitchPackage>
          <SwitchPackage
            name="storybook"
            packageName="storybook"
            setInput={setInput}
            input={input}
            dispatchPackages={dispatchPackages}
          >
            Storybook
          </SwitchPackage>
        </FormSection>
      </div>
    </Card>
  );
};
