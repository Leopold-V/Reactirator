import React from 'react';

import FormSection from './FormSection';
import Checkbox from './Checkbox';

export const FormCustomProject = ({input, setInput}: {input: any, setInput: any}) => {
    return (
        <div className="bg-white text-gray-800 px-8 rounded shadow">
            <div className="flex flex-col items-center py-6 divide-y-2 divide-gray-200 space-y-6">
                <FormSection title="Syntax">
                    <Checkbox name="typescript" setInput={setInput} input={input} >Typescript : </Checkbox>
                    <Checkbox name="prettier" setInput={setInput} input={input} >Prettier : </Checkbox>
                    <Checkbox name="flow" setInput={setInput} input={input} >Flow : </Checkbox>
                </FormSection>
                <FormSection title="Styles">
                    <Checkbox name="tailwind" setInput={setInput} input={input} >Tailwind : </Checkbox>
                    <Checkbox name="bootstrap" setInput={setInput} input={input} >Bootstrap : </Checkbox>
                    <Checkbox name="normalize" setInput={setInput} input={input} >CSS reset : </Checkbox>
                </FormSection>
                <FormSection title="Packages">
                    <Checkbox name="sourcemapexplorer" setInput={setInput} input={input} >source-map-explorer : </Checkbox>
                    <Checkbox name="storybook" setInput={setInput} input={input} >Storybook : </Checkbox>
                </FormSection>
            </div>
        </div>
    )
}
