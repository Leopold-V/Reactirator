import React from 'react';
import { GithubSection } from '../GithubBlock';

export const GithubPage = ({ token, setToken} : { token: string, setToken: (token: string) => void}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full space-y-8">
      <div className="bg-white border-gray-200 shadow text-gray-700 dark:bg-blueGray dark:text-white p-6 rounded-lg flex flex-col justify-center hover:shadow-lg transition duration-200">
        <h2 className="font-extrabold text-xl pb-6 text-center">Create a github repo</h2>
        <GithubSection token={token} setToken={setToken} />
      </div>
    </div>
  );
};
