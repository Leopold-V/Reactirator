import React from 'react';

import FormSection from './FormSection';
import Checkbox from './Checkbox';
import { formInputType } from '../helpers/types';

export const FormCustomProject = ({input, setInput}: {input: formInputType, setInput: (input: formInputType) => void}) => {
    return (
        <div className="bg-white text-gray-800 px-2 pb-2 rounded shadow">
            <h2 className="font-extrabold text-xl py-6 text-center">Customization</h2>
            <div className="flex flex-col items-center space-y-2">
                <FormSection title="Development" color="green">
                    <Checkbox name="typescript" packageName="typescript" setInput={setInput} input={input} >Typescript</Checkbox>
                    <Checkbox name="prettier" packageName="prettier" setInput={setInput} input={input} >Prettier</Checkbox>
                    <Checkbox name="flow" packageName="flow-bin" setInput={setInput} input={input} >Flow</Checkbox>
                </FormSection>
                <FormSection title="Styles" color="red">
                    <Checkbox name="tailwind" packageName="@tailwindcss/postcss7-compat" setInput={setInput} input={input} >Tailwind</Checkbox>
                    <Checkbox name="bootstrap" packageName="bootstrap" setInput={setInput} input={input} >Bootstrap</Checkbox>
                    <Checkbox name="normalize" packageName="normalize.css" setInput={setInput} input={input} >CSS reset</Checkbox>
                </FormSection>
                <FormSection title="Tools" color="blue">
                    <Checkbox name="sourcemapexplorer" packageName="source-map-explorer" setInput={setInput} input={input} >source-map-explorer</Checkbox>
                    <Checkbox name="storybook" packageName="storybook" setInput={setInput} input={input} >Storybook</Checkbox>
                </FormSection>
            </div>
        </div>
    )
}
