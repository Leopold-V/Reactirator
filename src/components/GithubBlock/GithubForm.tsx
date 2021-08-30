import React, { FormEvent, useEffect, useRef } from 'react';
import { useGithub } from '../Contexts/GithubProvider';

export const GithubForm = () => {
  const ref_reponame = useRef(null);

  const { github, setGithub } = useGithub();

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setGithub({ ...github, reponame: e.currentTarget.value })
  };

  useEffect(() => {
    ref_reponame.current.focus();
  }, []);

  return (
    <div className="text-center space-y-4">
      <input
        className="input"
        type="text"
        ref={ref_reponame}
        value={github.reponame}
        name="reponame"
        placeholder="repo name"
        onChange={handleChange}
      />
      <div className="my-2 space-y-3">
        <h3>Automatically push the project files to github once it is generated ?</h3>
        <div className="flex justify-center space-x-4">
          <div className="space-x-2">
            <input type="radio" id="yes" name="push" value="yes" checked />
            <label htmlFor="yes">Yes</label>
          </div>
          <div className="space-x-2">
            <input type="radio" id="no" name="push" value="no" />
            <label htmlFor="no">No</label>
          </div>
        </div>
      </div>
    </div>
  );
};
