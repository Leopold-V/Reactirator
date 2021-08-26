import React, { useEffect, useRef } from 'react';
import { formInputType } from '../../helpers/types';
import { usePackageJson } from '../Contexts/PackageJsonProvider';
import { ButtonCreation } from '../Buttons';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setInput({ ...input, [e.target.name]: e.target.value });
    packageJson.name = e.target.value;
    dispatchJson({
      type: 'CHANGE_INFO',
      payload: { name: appname_ref.current.value, description: description_ref.current.value },
    });
  };

  useEffect(() => {
    appname_ref.current.focus();
  }, []);

  return (
    <div className="w-72 bg-gradient-to-br from-indigo-50 to-indigo-300 text-gray-700 p-6 rounded-lg flex flex-col justify-center shadow hover:shadow-lg transition duration-200">
      <h2 className="font-extrabold text-xl pb-6 text-center">🚀 Create a project 🚀</h2>
      <div className="flex flex-col justify-center items-center w-full pb-6 space-y-4">
        <input
          onChange={handleChange}
          className="input w-full bg-white"
          type="text"
          name="appname"
          id="appname"
          placeholder="Application name"
          ref={appname_ref}
        />
        <textarea
          onChange={handleChange}
          className="resize-none input w-full"
          name="description"
          id="description"
          placeholder="Description"
          ref={description_ref}
        />
      </div>
      <ButtonCreation input={input} />
    </div>
  );
};
