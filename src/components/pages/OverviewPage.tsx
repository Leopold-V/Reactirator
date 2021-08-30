import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';

import { toast } from 'react-hot-toast';

import { toastInstallMsg, toastInstallStyle } from '../../helpers/toast';
import { formInputType } from '../../helpers/types';
import { generateProject } from '../../services/installation.service';
import { usePackageJson } from '../Contexts/PackageJsonProvider';
import { useModal } from '../../hooks/useModal';

import { ModalInstallation } from '../InstallationBlock';
import { CardPackageJson } from '../PackageJsonBlock';
import { CardProjectName } from '../ProjectCreationBlock';
import { CardHelp } from '../ProjectCreationBlock';
import { useDependencies } from '../Contexts/dependenciesProvider';

type argType = [filepath: string, input: formInputType];

export const OverviewPage = ({
  input,
  setInput,
  readme,
}: {
  input: formInputType;
  setInput: (input: formInputType) => void;
  readme: string;
}) => {
  const [show, toggleModal] = useModal();
  const [loading, setLoading] = useState(false);

  const { listPackages } = useDependencies();
  const { packageJson } = usePackageJson();

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
    <div className="flex items-start justify-between w-full space-x-8">
      <div className="flex flex-col w-6/12 space-y-8 h-full">
        <CardProjectName input={input} setInput={setInput} />
        <CardHelp />
      </div>
      <div className="w-6/12 h-full">
        <CardPackageJson />
      </div>
      <ModalInstallation loading={loading} show={show} toggleModal={toggleModal} />
    </div>
  );
};
