import React, { useReducer, useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';

import { toast } from 'react-hot-toast';

import { toastInstallMsg, toastInstallStyle } from '../../helpers/toast';
import initialState from '../../helpers/initialState';
import { formInputType, depStateType } from '../../helpers/types';
import { generateProject } from '../../services/installation.service';
import dependenciesReducer from '../../reducers/dependenciesReducer';
import { usePackageJson } from '../Contexts/PackageJsonProvider';
import { useModal } from '../../hooks/useModal';

import { FormCustomProject } from '../CustomPackageBlock';
import { ModalInstallation } from '../InstallationBlock';
import { CardPackageJson } from '../PackageJsonBlock';
import { ScriptSection } from '../ScriptBlock';
import { CardProjectName } from '../ProjectCreationBlock/CardProjectName';
import { PackagesSizeMemoized } from '../PackageCharts';
import { ReadmeSection } from '../ReadmeBlock';
//import { TreemapMemoized } from './Treemap';

const initialDeps: depStateType = {
  dependencies: [],
  devDependencies: [],
};

type argType = [filepath: string, input: formInputType];

export const OverviewPage = ({readme}: {readme: string}) => {
  const [show, toggleModal] = useModal();
  const [loading, setLoading] = useState(false);
  const [listPackages, dispatch] = useReducer(dependenciesReducer, initialDeps);
  const { packageJson } = usePackageJson();

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
              generateProject(filepath, input, listPackages, packageJson.scripts, readme),
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
    <div className="flex">
      <CardProjectName input={input} setInput={setInput} />
      <FormCustomProject input={input} setInput={setInput} dispatchPackages={dispatch} />
      <CardPackageJson />
      <ModalInstallation loading={loading} show={show} toggleModal={toggleModal} />
    </div>
  );
};
