import React, { FormEvent, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { toastInstallStyle, toastValidationStyle } from '../../helpers/toast';
import { createRepo } from '../../services/github.services';

export const GithubForm = ({ token }: { token: string }) => {
  const ref_reponame = useRef(null);

  const handleCreateRepo = (e: FormEvent) => {
    e.preventDefault();
    console.log(ref_reponame.current.value);
    if (!ref_reponame.current.value) {
      toast('The repo name is invalid !', toastValidationStyle);
    } else {
      toast.promise(
        createRepo(token, ref_reponame.current.value),
        {
          loading: 'Loading...',
          success: 'Repo created in your github !',
          error: 'Error, please retry later or report if the problem persists',
        },
        toastInstallStyle
      );
      ref_reponame.current.value = '';
    }
  };

  useEffect(() => {
    ref_reponame.current.focus();
  }, []);

  return (
    <form onSubmit={handleCreateRepo} className="text-center space-y-4">
      <input
        className="input"
        type="text"
        ref={ref_reponame}
        name="reponame"
        placeholder="repo name"
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
      <button
        className="flex items-center mx-auto shadow-red bg-gray-900 opacity-100 px-4 py-2 outline-none font-bold
        tracking-wider text-white rounded-lg hover:opacity-90 focus:outline-none transition duration-250"
      >
        Create
      </button>
    </form>
  );
};
