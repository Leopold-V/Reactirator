import React, { useReducer, useState, useEffect } from 'react';
const { ipcRenderer } = require('electron');

import { toast } from 'react-hot-toast';

import { toastInstallMsg, toastInstallStyle } from '../helpers/toast';
import initialState from '../helpers/initialState';
import { formInputType, depStateType } from '../helpers/types';
import { generateProject } from '../services/installation.service';
import dependenciesReducer from '../reducers/dependenciesReducer';
import { usePackageJson } from './Contexts/PackageJsonProvider';
import { useModal } from '../hooks/useModal';

import { FormCustomProject } from './CustomPackageBlock';
import { ModalInstallation } from './InstallationBlock';
import { PackagesManager } from './PackageManagerBlock';
import { CardPackageJson } from './PackageJsonBlock';
import { CardProjectName } from './ProjectCreationBlock/CardProjectName';
import { PackagesSizeMemoized } from './PackageCharts';
import { ScriptSection } from './ScriptSection';
//import { TreemapMemoized } from './Treemap';

const initialDeps: depStateType = {
  dependencies: [],
  devDependencies: [],
};

type argType = [filepath: string, input: formInputType];

export const MainContent = () => {
  const { baseSize } = usePackageJson();
  const [show, toggleModal] = useModal();
  const [loading, setLoading] = useState(false);
  const [listPackages, dispatch] = useReducer(dependenciesReducer, initialDeps);

  const [input, setInput] = useState(initialState);

  useEffect(() => {
    ipcRenderer.on(
      'open-dialog-directory-selected',
      async (event: Electron.IpcRendererEvent, arg: argType) => {
        const [filepath, input] = arg;
        if (arg) {
          setLoading(true);
          toggleModal();
          try {
            await toast.promise(
              generateProject(filepath, input, listPackages),
              toastInstallMsg,
              toastInstallStyle
            );
          } catch (error) {
            console.log(error);
          }
          setLoading(false);
        }
      }
    );
    return () => {
      ipcRenderer.removeAllListeners('open-dialog-directory-selected');
    };
  }, [listPackages]);

  return (
    <div className="z-10 flex flex-col md:w-11/12">
      <div className="mx-auto">
        <CardProjectName input={input} setInput={setInput} />
      </div>

      <div className="flex justify-between">
        <div className="w-3/12 -mt-52 space-y-10">
          <FormCustomProject input={input} setInput={setInput} dispatchPackages={dispatch} />
          <PackagesSizeMemoized listPackages={listPackages} baseSize={baseSize} />
        </div>

        <div className="flex-grow flex flex-col pt-12 space-y-10">
          <PackagesManager listPackages={listPackages} dispatchPackages={dispatch} />
          {/* <TreemapMemoized listPackages={listPackages} /> */}
          <div className="sm:w-3/4 mx-auto">
            <ScriptSection />
          </div>
        </div>

        <div className="w-3/12 -mt-52">
          <CardPackageJson />
        </div>
      </div>

      <ModalInstallation loading={loading} show={show} toggleModal={toggleModal} />
    </div>
  );
};
