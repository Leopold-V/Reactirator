import React, { ChangeEvent } from 'react';

export const ComponentMode = ({
  mode,
  setMode,
}: {
  mode: string;
  setMode: (mode: string) => void;
}) => {
  const handleChangeMode = (e: ChangeEvent<HTMLInputElement>) => {
    setMode(e.target.value);
  };

  return (
    <div>
      <h2>Mode: </h2>
      <div className="flex justify-center space-x-5 text-sm w-full" onChange={handleChangeMode}>
        <div className="flex">
          <input type="radio" id="rfc" name="mode" value="rfc" checked={mode === 'rfc'} readOnly />
          <label className="px-2" htmlFor="rfc">
            rfc
          </label>
        </div>
        <div className="flex">
          <input type="radio" id="rcc" name="mode" value="rcc" checked={mode === 'rcc'} readOnly />
          <label className="px-2" htmlFor="rcc">
            rcc
          </label>
        </div>
        <div className="flex">
          <input
            type="radio"
            id="rfce"
            name="mode"
            value="rfce"
            checked={mode === 'rfce'}
            readOnly
          />
          <label className="px-2" htmlFor="rfce">
            rfce
          </label>
        </div>
        <div className="flex">
          <input
            type="radio"
            id="rafc"
            name="mode"
            value="rafc"
            checked={mode === 'rafc'}
            readOnly
          />
          <label className="px-2" htmlFor="rafc">
            rafc
          </label>
        </div>
        <div className="flex">
          <input
            type="radio"
            id="rafce"
            name="mode"
            value="rafce"
            checked={mode === 'rafce'}
            readOnly
          />
          <label className="px-2" htmlFor="rafce">
            rafce
          </label>
        </div>
        <div className="flex">
          <input
            type="radio"
            id="rafcp"
            name="mode"
            value="rafcp"
            checked={mode === 'rafcp'}
            readOnly
          />
          <label className="px-2" htmlFor="rafcp">
            rafcp
          </label>
        </div>
        <div className="flex">
          <input type="radio" id="rmc" name="mode" value="rmc" checked={mode === 'rmc'} readOnly />
          <label className="px-2" htmlFor="rmc">
            rmc
          </label>
        </div>
      </div>
    </div>
  );
};
