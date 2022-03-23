import React, { ChangeEventHandler } from 'react';

type inputProps = {
  className?: string;
  value?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  type?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

type textAreaProps = {
  className?: string;
  value?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
};

export const Input = React.forwardRef<any, inputProps>(
  ({ className, value, name, id, placeholder, type, onChange }, ref) => {
    return (
      <input
        type={type}
        className={`${
          className ? className : ''
        } block text-center bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm`}
        value={value}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        ref={ref}
      />
    );
  }
);

export const TextArea = React.forwardRef<any, textAreaProps>(
  ({ className, value, name, id, placeholder, onChange }, ref) => {
    return (
      <textarea
        className={`${
          className ? className : ''
        } block text-center bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm`}
        value={value}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        ref={ref}
      />
    );
  }
);
