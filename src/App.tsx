import { ipcRenderer } from 'electron';
import React, { useEffect, useReducer, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Link, Route, Switch, useHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { store } from './store';
import { useAppDispatch, useAppSelector } from './hooks';
import { getSizeOfPackagesList, searchPackages } from './services/package.service';
import initialPackageJson from './creator/helpers/initialPackageJson';
import jsonPackageReducer from './creator/reducers/jsonPackageReducer';
import { initProject, resetProject } from './slices/projectSlice';

import { PackageJsonProvider } from './creator/components/Contexts/PackageJsonProvider';
import { DependenciesProvider } from './creator/components/Contexts/dependenciesProvider';
import { GithubProvider } from './creator/components/Contexts/GithubProvider';

import Creator from './creator';
import Manager from './manager';
import { Bar } from './common/Bar';
import { Card } from './common/Card';
import { promisifyReadFs } from './utils/promisifyFs';
import { taskType } from './manager/helpers/types';
import { initTasks } from './slices/taskSlice';
import { initDependencies } from './slices/dependenciesSlice';
import { formatDeps } from './utils/formatDeps';

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Bar />
        <Switch>
          <Route exact path="/" render={() => <Menu />} />
          <Route
            path="/manager"
            component={managerLoader(<Manager />)}
          />
          <Route
            path="/creator"
            component={creatorLoader(<Creator />)}
          />
        </Switch>
      </HashRouter>
    </Provider>
  );
};

const Menu = () => {
  const projectLoading = useAppSelector((state) => state.project.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!projectLoading) {
      dispatch(resetProject());
    }
  }, []);

  return (
    <div className="relative bg-gray-50 dark:bg-primary space-y-8 overflow-y-auto flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center">
        <Link
          className="flex rounded flex-col items-center space-y-4 justify-around font-extrabold text-4xl"
          to="/"
        >
          <img src="../assets/icons/png/64x64.png" alt="icon" />
          <span className="dark:text-white">Reactirator</span>
        </Link>
      </div>
      <div className="flex justify-center items-center space-x-4">
        <Link to="/creator">
          <Card large={true}>
            <div className="text-xl text-center font-semibold w-32">Creation</div>
          </Card>
        </Link>
        <Link to="/manager">
          <Card large={true}>
            <div className="text-xl text-center font-semibold w-32">Development</div>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export const creatorLoader = (creator: JSX.Element) => {
  return () => {
    const [packageJson, dispatchJson] = useReducer(
      jsonPackageReducer,
      JSON.parse(JSON.stringify(initialPackageJson))
    );
    const [baseSize, setBaseSize] = useState(0);
    const [loading, setLoading] = useState(true);

    const getVersionsOfBaseDeps = async (): Promise<any[]> => {
      const list = [];
      for (const ele in packageJson.dependencies) {
        const res = await searchPackages(ele, 1);
        list.push(res[0]);
        dispatchJson({
          type: 'ADD',
          payload: {
            category: 'dependencies',
            name: res[0].package.name,
            version: res[0].package.version,
          },
        });
      }
      return list;
    };

    const initializeTotalSize = async (listPkg: any[]): Promise<void> => {
      // initial size with only CRA dependencies
      const totalSize = await getSizeOfPackagesList(listPkg);
      const totalSizeInKb = Math.floor(totalSize / 1000);
      setBaseSize(totalSizeInKb);
    };

    useEffect(() => {
      (async () => {
        const updatedDepsList = await getVersionsOfBaseDeps();
        await initializeTotalSize(updatedDepsList);
        setLoading(false);
      })();
    }, []);

    if (loading)
      return (
        <div className="pt-8 flex flex-col justify-center items-center font-bold text-2xl h-screen space-y-8">
          <ClipLoader color="#3672D7" loading={loading} size={150} />
          <div>Loading...</div>
        </div>
      );
    return (
      <PackageJsonProvider
        packageJson={packageJson}
        dispatchJson={dispatchJson}
        baseSize={baseSize}
      >
        <DependenciesProvider>
          <GithubProvider>{creator}</GithubProvider>
        </DependenciesProvider>
      </PackageJsonProvider>
    );
  };
};

const managerLoader = (manager: JSX.Element) => {
  return () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    const dispatch = useAppDispatch();

    useEffect(() => {
      ipcRenderer.send('open-directory');
      ipcRenderer.on('open-dialog-directory-not-selected', () => {
        history.push('/');
      });
      ipcRenderer.on(
        'open-dialog-directory-selected',
        async (event: Electron.IpcRendererEvent, arg: any) => {
          const [filepath] = arg;
          try {
            const content = await promisifyReadFs(`${filepath}/package.json`);
            const contentObj = JSON.parse(content);
            if (contentObj.dependencies.react) {
              const newTaskList: Record<string, taskType> = {};
              Object.keys(contentObj.scripts).map(
                (ele: any) =>
                  (newTaskList[ele] = {
                    taskState: 'Idle',
                    enabled: false,
                    isKill: false,
                    logs: '',
                  })
              );
              dispatch(
                initProject({
                  projectName: contentObj.name,
                  projectPath: filepath[0],
                })
              );
              dispatch(
                initTasks({
                  tasks: newTaskList,
                })
              );
              dispatch(
                initDependencies({
                  dependencies: formatDeps(contentObj.dependencies, false),
                  devDependencies: formatDeps(contentObj.devDependencies, true),
                  depSelected: {
                    depName: Object.keys(contentObj.dependencies)[0],
                    depVersion: Object.entries(formatDeps(contentObj.dependencies, true))[0][1].version,
                    isDevDep: false
                  }
                })
              );
              setLoading(false);
            }
          } catch (error) {
            history.push('/');
            alert('This is not a react project!');
          }
        }
      );
      return () => {
        ipcRenderer.removeAllListeners('open-dialog-directory-selected');
        ipcRenderer.removeAllListeners('open-dialog-directory-not-selected');
      };
    }, []);

    if (loading)
      return (
        <div className="bg-gray-50 flex flex-col justify-center items-center font-bold text-2xl h-screen space-y-8">
          <ClipLoader color="#3672D7" loading={loading} size={150} />
          <div>Loading...</div>
        </div>
      );
    return <>{manager}</>;
  };
};

function render() {
  ReactDOM.render(<App />, document.querySelector('#app'));
}

render();
