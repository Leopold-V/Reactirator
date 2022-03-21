import React from 'react';

import { formInputType } from '../../helpers/types';

import { GithubSection } from '../GithubBlock';
import { Button } from '../../../common/Button';
import { useHistory } from 'react-router-dom';
import { DetailsForm } from '../DetailsBlock';

export const DetailsPage = ({
  input,
  setInput,
}: {
  input: formInputType;
  setInput: (input: formInputType) => void;
}) => {
  const history = useHistory();

  const handleNav = () => {
    history.push('/creator/packages');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full space-y-2">
        <DetailsForm input={input} setInput={setInput} />
        <GithubSection />
        <div className="mx-auto pt-6">
          <Button onClick={handleNav}>Next</Button>
        </div>
    </div>
  );
};
