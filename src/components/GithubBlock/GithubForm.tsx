import React, { ChangeEvent } from 'react';
import { useGithub } from '../Contexts/GithubProvider';

export const GithubForm = () => {
  const { github, setGithub } = useGithub();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGithub({ ...github, reponame: e.target.value })
  };

  const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setGithub({...github, visibility: e.target.value})
  }

  return (
    <div className="text-center space-y-4">
      <div className="my-2 space-y-3">
        <h3><label htmlFor="reponame">Name :</label></h3>
        <input
          className="input"
          type="text"
          value={github.reponame}
          name="reponame"
          id="reponame"
          placeholder="repo name"
          onChange={handleChange}
        />
      </div>
      <div className="my-2 space-y-3">
        <h3>Repo visibility :</h3>
        <div className="flex justify-center space-x-4" onChange={handleChangeCheckbox}>
          <div className="space-x-2">
            <input type="radio" id="public" name="visibility" value="public" checked={github.visibility === "public"} />
            <label htmlFor="public">Public</label>
          </div>
          <div className="space-x-2">
            <input type="radio" id="private" name="visibility" value="private" checked={github.visibility === "private"} />
            <label htmlFor="private">Private</label>
          </div>
        </div>
      </div>
    </div>
  );
};
