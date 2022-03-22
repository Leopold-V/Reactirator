import React, { useRef } from 'react';

import { formInputType } from '../../helpers/types';

import { usePackageJson } from '../Contexts/PackageJsonProvider';
import { TextArea, Input } from '../../../common/Input';
import { Title } from '../../../common/Typo';

export const DetailsForm = ({
  input,
  setInput,
}: {
  input: formInputType;
  setInput: (input: formInputType) => void;
}) => {
  const { packageJson, dispatchJson } = usePackageJson();

  const appname_ref = useRef<HTMLInputElement>(null);
  const description_ref = useRef<HTMLTextAreaElement>(null);
  const version_ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setInput({ ...input, [e.target.name]: e.target.value });
    packageJson.name = e.target.value;
    dispatchJson({
      type: 'CHANGE_INFO',
      payload: {
        name: appname_ref.current.value,
        version: version_ref.current.value,
        description: description_ref.current.value,
      },
    });
  };

  return (
    <div className="w-1/3 space-y-2">
      <Title title="Application information" />
      <div>
        <label htmlFor="appname" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <div className="mt-1">
          <Input
            onChange={handleChange}
            value={input.appname}
            className=" w-full"
            type="text"
            name="appname"
            id="appname"
            placeholder="App. name"
            ref={appname_ref}
          />
        </div>
      </div>
      <div>
        <label htmlFor="version" className="block text-sm font-medium text-gray-700">
          Version
        </label>
        <div className="mt-1">
          <Input
            onChange={handleChange}
            value={input.version}
            className="w-full"
            type="text"
            name="version"
            id="version"
            placeholder="Version"
            ref={version_ref}
          />
        </div>
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <div className="mt-1">
          <TextArea
            onChange={handleChange}
            value={input.description}
            className="resize-none w-full"
            name="description"
            id="description"
            placeholder="Description"
            ref={description_ref}
          />
        </div>
      </div>
    </div>
  );
};
