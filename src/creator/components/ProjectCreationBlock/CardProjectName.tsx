import React, { useRef } from 'react';
import { formInputType } from '../../helpers/types';
import { usePackageJson } from '../Contexts/PackageJsonProvider';
import { ButtonCreation } from '../Buttons';
import { Card } from '../../../common/Card';
import { Input, TextArea } from '../../../common/Input';

export const CardProjectName = ({
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
    <Card>
      <h2 className="font-extrabold text-xl pb-6 text-center">Create a project</h2>
      <div className="flex flex-col justify-center items-center w-full pb-6 space-y-4">
        <Input
          onChange={handleChange}
          value={input.appname}
          className="w-10/12"
          type="text"
          name="appname"
          id="appname"
          placeholder="Application name"
          ref={appname_ref}
        />
        <Input
          onChange={handleChange}
          value={input.version}
          className="w-10/12"
          type="text"
          name="version"
          id="version"
          placeholder="Version"
          ref={version_ref}
        />
        <TextArea
          onChange={handleChange}
          value={input.description}
          className="w-10/12 resize-none input"
          name="description"
          id="description"
          placeholder="Description"
          ref={description_ref}
        />
      </div>
      <ButtonCreation input={input} />
    </Card>
  );
};
