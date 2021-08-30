import React, { useState } from 'react';
import { ButtonGithubLogin } from '../Buttons';
import { useGithub } from '../Contexts/GithubProvider';
import { GithubForm } from './GithubForm';

export const GithubSection = () => {
  const [loading, setLoading] = useState(false);
  const { github } = useGithub();

  if (loading) return <div className="text-center font-bold my-2">Authentication...</div>;
  if (!github.token) return <ButtonGithubLogin setLoading={setLoading} />
  return <GithubForm />
};