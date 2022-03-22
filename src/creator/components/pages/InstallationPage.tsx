import { ipcRenderer } from 'electron';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import { generateProject } from '../../../services/installation.service';
import { formInputType, structureStateType } from '../../helpers/types';
import { toastInstallStyle } from '../../helpers/toast';

import { useModal } from '../../../hooks/useModal';
import { useDependencies } from '../Contexts/dependenciesProvider';
import { usePackageJson } from '../Contexts/PackageJsonProvider';
import { useGithub } from '../Contexts/GithubProvider';

import { Title } from '../../../common/Typo';
import { CardPackageJson } from '../PackageJsonBlock';
import { ButtonCreation } from '../Buttons';
import { ModalInstallation } from '../InstallationBlock';

export const InstallationPage = ({ input, structure }: { input: formInputType,   structure: structureStateType }) => {
    const [show, toggleModal] = useModal();
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const { listPackages } = useDependencies();
    const { packageJson } = usePackageJson();
    const { github } = useGithub();

  useEffect(() => {
    ipcRenderer.on(
      'open-dialog-directory-selected',
      async (event: Electron.IpcRendererEvent, arg) => {
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
                github
              ),
              {
                loading: 'Installation start !',
                success: () => {
                    history.push('/success');
                    return `Successfully installed !`
                },
                error: () => `An error happened`,
              },
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
    <div className="flex flex-col items-center justify-center w-full space-y-2">
      <Title title="Overview of your configuration: " />
      <CardPackageJson />
      <div className="py-3">
        <ButtonCreation input={input} />
      </div>
      <ModalInstallation loading={loading} show={show} toggleModal={toggleModal} />
    </div>
  );
};
