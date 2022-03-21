import React, { ChangeEvent } from 'react';
import { Input } from '../../../common/Input';
import { useGithub } from '../Contexts/GithubProvider';

export const GithubForm = () => {
  const { github, setGithub } = useGithub();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGithub({ ...github, reponame: e.target.value });
  };

  const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setGithub({ ...github, visibility: e.target.value });
  };

  return (
    <div className="space-y-2">
      <div>
        <label htmlFor="reponame" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <Input
          type="text"
          value={github.reponame}
          className="w-full"
          name="reponame"
          id="reponame"
          placeholder="repo name"
          onChange={handleChange}
        />
      </div>
      <div>
        <div className="flex justify-center space-x-4" onChange={handleChangeCheckbox}>
          <div className="space-x-2">
            <input
              type="radio"
              id="public"
              name="visibility"
              value="public"
              checked={github.visibility === 'public'}
            />
            <label className="text-sm" htmlFor="public">Public</label>
          </div>
          <div className="space-x-2 text-sm">
            <input
              type="radio"
              id="private"
              name="visibility"
              value="private"
              checked={github.visibility === 'private'}
            />
            <label className="text-sm" htmlFor="private">Private</label>
          </div>
        </div>
      </div>
    </div>
  );
};
