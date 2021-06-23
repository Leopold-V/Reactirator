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
        className="shadow rounded py-2 px-2 bg-gray-100
                      focus:outline-none focus:border-transparent
                      w-full h-full placeholder-gray-500 resize-none transition duration-200"
        placeholder="Write something about your project ?"
        name="content"
        value={readme}
      />
    </div>
  );
};
