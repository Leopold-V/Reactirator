import React, { useState } from 'react';

import { useGithub } from '../Contexts/GithubProvider';
import { GithubForm } from './GithubForm';
import { ButtonGithubLogin } from '../Buttons';
import { Title } from '../../../common/Typo';

export const GithubSection = () => {
  const [loading, setLoading] = useState(false);
  const { github } = useGithub();

  if (loading)
    return (
      <div className="flex flex-col justify-center">
        <div className="text-center font-bold my-2">Authentication...</div>
      </div>
    );
  return (
    <div className="flex flex-col justify-center pt-3 w-1/3">
      <Title title="Initialize a github repository" />
      {!github.token ? <ButtonGithubLogin setLoading={setLoading} /> : <GithubForm />}
    </div>
  );
};
