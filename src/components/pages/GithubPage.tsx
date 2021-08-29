import React, { useState } from 'react';
import { authGitHub, getToken } from '../../utils/authGithub';

export const GithubPage = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true);
    const { authCode } = await authGitHub();
    const { token } = await getToken(authCode);
    setLoading(false);
    setToken(token);
  }

  console.log(process.env.CLIENT_ID);
  console.log(process.env.CLIENT_SECRET);

  if (loading) return <div>Authentication...</div>
  return (
    <div className="flex flex-col w-full space-y-8">
      <div className="bg-white flex-grow border-gray-200 shadow text-gray-700 dark:bg-blueGray dark:text-white p-6 rounded-lg flex flex-col justify-center hover:shadow-lg transition duration-200">
        <h2 className="text-center mb-4">Github control [Incoming feature]</h2>
        {!token ? <button
          onClick={handleClick}
              className="flex items-center mx-auto shadow-red bg-gray-900 opacity-100 px-4 py-2 outline-none font-bold
              tracking-wider text-white rounded-lg hover:opacity-90 focus:outline-none transition duration-250"
        >
        <span className="mr-2">Login</span>
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="#fff" width="20">
              <path d="M12 2A10 10 0 002 12a10 10 0 006.8 9.5c.5 0 .7-.2.7-.5v-1.7C6.7 20 6.1 18 6.1 18c-.4-1.2-1-1.5-1-1.5-1-.6 0-.6 0-.6 1 0 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9 0-.7.3-1.1.6-1.4-2.2-.2-4.6-1-4.6-4.9 0-1.1.4-2 1-2.7 0-.3-.4-1.3.2-2.7 0 0 .8-.2 2.7 1a9.4 9.4 0 015 0c2-1.2 2.8-1 2.8-1 .5 1.4.1 2.4 0 2.7.7.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.5 5 .4.2.7.8.7 1.8V21c0 .3.2.6.7.5 4-1.3 6.8-5 6.8-9.5A10 10 0 0012 2z"></path>
            </svg>
        </button>
        : <div>You are connected to github !</div>}
      </div>
    </div>
  );
};
