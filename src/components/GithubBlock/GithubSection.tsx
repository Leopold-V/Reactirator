import React, { useState } from 'react';
import { ButtonGithubLogin } from '../Buttons';
import { GithubForm } from './GithubForm';

export const GithubSection = ({token, setToken } : { token: string, setToken: (token: string) => void}) => {
  const [loading, setLoading] = useState(false);

  if (loading) return <div className="text-center font-bold my-2">Authentication...</div>;
  if (!token) return <ButtonGithubLogin setToken={setToken} setLoading={setLoading} />
  return <GithubForm token={token} />
};