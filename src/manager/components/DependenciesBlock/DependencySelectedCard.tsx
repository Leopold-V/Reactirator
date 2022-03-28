import { ipcRenderer } from 'electron';
import React, { useEffect, useState } from 'react';
import { BadgeCheckIcon, CogIcon } from '@heroicons/react/outline';

import { searchOnePackage } from '../../../services/package.service';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { updateDep } from '../../../slices/dependenciesSlice';

import { ButtonDelete, ButtonSecondary } from '../../../common/Button';
import { Card } from '../../../common/Card';

export const DependencySelectedCard = () => {
  // TODO
  // create a single state for data + loading + error
  const [data, setdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const selectedDeps = useAppSelector((state) => state.dependencies.depSelected);
  const projectPath = useAppSelector((state) => state.project.projectPath);
  const dependencyStatus = useAppSelector(
    (state) =>
      state.dependencies[selectedDeps.isDevDep ? 'devDependencies' : 'dependencies'][
        selectedDeps.depName
      ].status
  );

  const dispatch = useAppDispatch();

  const updateDependency = () => {
    ipcRenderer.send('dep-update', {
      depName: selectedDeps.depName,
      path: projectPath,
      isDevDep: selectedDeps.isDevDep,
      version: data.collected.metadata.version,
    });
    dispatch(
      updateDep({
        name: selectedDeps.depName,
        version: selectedDeps.depVersion,
        isDevDep: selectedDeps.isDevDep,
        status: 'Pending',
      })
    );
  };

  const removeDependency = () => {
    ipcRenderer.send('dep-uninstall', {
      depName: selectedDeps.depName,
      path: projectPath,
      isDevDep: selectedDeps.isDevDep,
    });
    dispatch(
      updateDep({
        name: selectedDeps.depName,
        version: selectedDeps.depVersion,
        isDevDep: selectedDeps.isDevDep,
        status: 'Pending',
      })
    );
  };

  const getData = async () => {
    setLoading(true);
    try {
      const pkgData = await searchOnePackage(selectedDeps.depName);
      setdata(pkgData);
      setLoading(false);
      setError(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedDeps]);

  if (error)
    return (
      <Card>
        <div className="flex items-center justify-center">
          The request to the server failed, rety later or report the problem if it persists.
        </div>
      </Card>
    );
  if (loading) return null;
  return (
    <div className="bg-white shadow overflow-hidden rounded">
      <CardHeader
        title={data.collected.metadata.name}
        description={data.collected.metadata.description}
      />
      <div className="border-t border-gray-200 p-0">
        <dl className="divide-y divide-gray-200">
          <div className="py-5 grid grid-cols-3 gap-4 px-6">
            <div className="col-span-1">
              <dt className="text-sm font-medium text-gray-500">Installed version</dt>
              <dd className="text-sm text-gray-900">{selectedDeps.depVersion}</dd>
            </div>
            <div className="col-span-1">
              <dt className="text-sm font-medium text-gray-500">Latest version</dt>
              <dd className="text-sm text-gray-900">{data.collected.metadata.version} </dd>
            </div>
            <div className="col-span-1">
              {dependencyStatus !== 'Pending' ? (
                selectedDeps.depVersion !== data.collected.metadata.version ? (
                  <ButtonSecondary onClick={updateDependency}>Update</ButtonSecondary>
                ) : (
                  <div className="pt-4 flex justify-center items-center space-x-1">
                    <BadgeCheckIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                    <span className="text-sm text-gray-700">Up-to-date</span>
                  </div>
                )
              ) : (
                <CogIcon
                  className="h-6 w-6 ml-2 mt-2 animate-spin text-gray-700 "
                  aria-hidden="true"
                />
              )}
            </div>
          </div>
          <div className="py-5 grid grid-cols-3 gap-4 px-6">
            <dt className="text-sm font-medium text-gray-500">Links</dt>
            <dd className="text-sm text-gray-900 col-span-2">
              <a
                href={`${data.collected.metadata.links.npm}`}
                className="font-semibold hover:text-indigo-600 transition duration-200"
              >
                Npm
              </a>
              &nbsp;-&nbsp;
              <a
                href={`${data.collected.metadata.links.repository}`}
                className="font-semibold hover:text-indigo-600 transition duration-200"
              >
                Github
              </a>
            </dd>
          </div>
          <div className="py-5 grid grid-cols-3 gap-4 px-6">
            <dt className="text-sm font-medium text-gray-500">Type</dt>
            <dd className="text-sm text-gray-900 col-span-2">
              {selectedDeps.isDevDep ? 'DevDependencies' : 'Dependencies'}
            </dd>
          </div>
          <div className="py-5 grid grid-cols-3 gap-4 px-6">
            <dt className="text-sm font-medium text-gray-500">Danger zone</dt>
            <dd className="col-span-2">
              <ButtonDelete disabled={dependencyStatus === 'Pending'} onClick={removeDependency}>
                Uninstall
              </ButtonDelete>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

const CardHeader = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="py-5 px-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
      <p className="mt-1 max-w-2xl text-sm text-gray-500">{description}</p>
    </div>
  );
};
