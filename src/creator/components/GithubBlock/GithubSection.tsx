import React, { useState } from 'react';

import { useGithub } from '../Contexts/GithubProvider';
import { GithubForm } from './GithubForm';
import { ButtonGithubLogin } from '../Buttons';

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
      <h3 className="block font-semibold text-gray-700 text-center py-2">Initialize a github repository</h3>
      {!github.token ? <ButtonGithubLogin setLoading={setLoading} /> : <GithubForm />}
    </div>
  );
};
