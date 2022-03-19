import React, { useState } from 'react';

import { useGithub } from '../Contexts/GithubProvider';
import { GithubForm } from './GithubForm';
import { Card } from '../../../common/Card';
import { ButtonGithubLogin } from '../Buttons';

export const GithubSection = () => {
  const [loading, setLoading] = useState(false);
  const { github } = useGithub();

  if (loading)
    return (
      <div className="flex-grow bg-white border-gray-200 shadow text-gray-700 dark:bg-blueGray dark:text-white p-6 rounded-lg flex flex-col justify-center hover:shadow-lg transition duration-200">
        <div className="text-center font-bold my-2">Authentication...</div>
      </div>
    );
  return (
    <Card>
      <div className="flex flex-col justify-center h-full">
        <h2 className="font-extrabold text-xl pb-6 text-center">Create a github repo</h2>
        {!github.token ? <ButtonGithubLogin setLoading={setLoading} /> : <GithubForm />}
      </div>
    </Card>
  );
};
