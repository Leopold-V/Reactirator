import React, { ChangeEvent } from 'react'
import { Input } from '../../../common/Input';
import { formCompType } from '../../helpers/types';
import { ComponentSwitch } from './ComponentSwitch';

export const FormComponent = ({
    input,
    setInput,
    name,
    setName
  }: {
    input: formCompType;
    setInput: (input: formCompType) => void;
    name: string,
    setName: (name: string) => void;
  }) => {
 const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
 }

  return (
    <div className="space-y-4 w-1/2">
        <Input
            className="mx-auto"
            name="Component name"
            placeholder="Component name"
            type="text"
            value={name}
            onChange={handleChangeName}
        />
        <div className="flex flex-col bg-white shadow overflow-auto rounded-md divide-y divide-gray-200">
            <ComponentSwitch
            name="function_component"
            setInput={setInput}
            input={input}
            >
            <div className="flex items-center text-gray-700 font-medium">Function component</div>
            <div className="text-gray-400">Lorem dolor sit amet consectetur adipisicing elit.</div>
            </ComponentSwitch>
            <ComponentSwitch
            name="styled_component"
            setInput={setInput}
            input={input}
            >
            <div className="flex items-center text-gray-700 font-medium">Styled component</div>
            <div className="text-gray-400">Lorem ipsum dolor sit amet adipisicing elit.</div>
            </ComponentSwitch>
            <ComponentSwitch
            name="typescript"
            setInput={setInput}
            input={input}
            >
            <div className="flex items-center text-gray-700 font-medium">Typescript</div>
            <div className="text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
            </ComponentSwitch>
        </div>
    </div>
  )
}
