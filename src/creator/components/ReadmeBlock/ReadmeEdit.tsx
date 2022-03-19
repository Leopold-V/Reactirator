import React, { ChangeEvent } from 'react';

export const ReadmeEdit = ({
  readme,
  setReadme,
}: {
  readme: string;
  setReadme: (input: any) => void;
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setReadme(e.target.value);
  };

  return (
    <div className="py-6 space-y-4 h-big flex flex-col items-center">
      <textarea
        onChange={handleChange}
        className="shadow rounded py-2 px-2 
                      focus:outline-none
                      w-full h-full resize-none transition duration-200 text-white
                      placeholder-gray-500 border-gray-600 bg-gray-700 focus:ring-1
  focus:ring-indigo-500 focus:bg-gray-900 focus:border-transparent"
        placeholder="Write something about your project ?"
        name="content"
        value={readme}
      />
    </div>
  );
};
