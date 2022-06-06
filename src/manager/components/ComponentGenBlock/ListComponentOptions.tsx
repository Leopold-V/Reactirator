import React from 'react';

import { formCompType } from '../../../manager/helpers/types';
import { ComponentSwitch } from './ComponentSwitch';

// TODO
// Create list component with a list object of all options

export const ListComponentOptions = ({
  input,
  setInput,
}: {
  input: formCompType;
  setInput: (input: formCompType) => void;
}) => {
  return (
    <div className="flex flex-col bg-white shadow overflow-auto rounded-md divide-y divide-gray-200">
      <ComponentSwitch name="function_component" setInput={setInput} input={input}>
        <div className="flex items-center text-gray-700 font-medium">Function component</div>
        <div className="text-gray-400">Lorem dolor sit amet consectetur adipisicing elit.</div>
      </ComponentSwitch>
      <ComponentSwitch name="styled_component" setInput={setInput} input={input}>
        <div className="flex items-center text-gray-700 font-medium">Styled component</div>
        <div className="text-gray-400">Lorem ipsum dolor sit amet adipisicing elit.</div>
      </ComponentSwitch>
      <ComponentSwitch name="typescript" setInput={setInput} input={input}>
        <div className="flex items-center text-gray-700 font-medium">Typescript</div>
        <div className="text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
      </ComponentSwitch>
    </div>
  );
};

const componentOptionsList = [
  {
    name: '',
    input: '',
  },
];
