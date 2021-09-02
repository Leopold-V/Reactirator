import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';

import { toast } from 'react-hot-toast';

import { toastInstallMsg, toastInstallStyle } from '../../helpers/toast';
import { formInputType, structureStateType } from '../../helpers/types';
import { generateProject } from '../../services/installation.service';
import { usePackageJson } from '../Contexts/PackageJsonProvider';
import { useDependencies } from '../Contexts/dependenciesProvider';
import { useGithub } from '../Contexts/GithubProvider';
import { useModal } from '../../hooks/useModal';

import { ModalInstallation } from '../InstallationBlock';
import { CardPackageJson } from '../PackageJsonBlock';
import { CardProjectName } from '../ProjectCreationBlock';
import { GithubSection } from '../GithubBlock';

type argType = [filepath: string, input: formInputType];

export const OverviewPage = ({
  structure,
  input,
  setInput,
  readme,
}: {
  structure: structureStateType;
  input: formInputType;
  setInput: (input: formInputType) => void;
  readme: string;
}) => {
  const [show, toggleModal] = useModal();
  const [loading, setLoading] = useState(false);

  const { listPackages } = useDependencies();
  const { packageJson } = usePackageJson();
  const { github } = useGithub();

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
              generateProject(
                filepath,
                input,
                listPackages,
                structure,
                packageJson.scripts,
                readme,
                github,
              ),
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
  }, [listPackages, github]);

  return (
    <div className="flex items-start justify-between w-full space-x-8">
      <div className="flex flex-col w-6/12 space-y-8 h-full">
        <CardProjectName input={input} setInput={setInput} />
        <GithubSection />
      </div>
      <div className="w-6/12 h-full">
        <CardPackageJson />
      </div>
      <ModalInstallation loading={loading} show={show} toggleModal={toggleModal} />
    </div>
  );
};
