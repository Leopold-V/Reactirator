import { ipcRenderer } from 'electron';
import React, { useEffect, useReducer, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Link, Route, Switch, useHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { ArrowLeftIcon } from '@heroicons/react/outline';

import { mixpanelTracker } from './analytics/mixpanel.service';
import { searchOnePackage } from './services/package.service';
import { promisifyReadFs } from './utils/promisifyFs';
import { formatDeps } from './utils/formatDeps';
import findStarter from './utils/findStarter';
import findStartScript from './utils/findStartScript';
import {
  initialPackageJsonCRA,
  initialPackageJsonVite,
} from './creator/helpers/initialPackageJson';
import { starterType } from './creator/helpers/types';
import { taskType } from './manager/helpers/types';
import { store } from './store';
import { useAppDispatch, useAppSelector } from './hooks';
import jsonPackageReducer from './creator/reducers/jsonPackageReducer';
import { initTasks } from './slices/taskSlice';
import { initDependencies } from './slices/dependenciesSlice';
import { initProject, resetProject } from './slices/projectSlice';

import { PackageJsonProvider } from './creator/components/Contexts/PackageJsonProvider';
import { DependenciesProvider } from './creator/components/Contexts/dependenciesProvider';
import { GithubProvider } from './creator/components/Contexts/GithubProvider';
import { SuccessPage } from './creator/components/pages/SuccessPage';
import Creator from './creator';
import CreatorVite from './creator/CreatorVite';
import Manager from './manager';
import { Bar } from './common/Bar';
import { CreatorMenuSelection } from './creator/CreatorMenuSelection';
import { ManagerMenuSelection } from './manager/ManagerMenuSelection';
//import { initProjectSrc } from './slices/projectSrcSlice';
//import readSrcFolder from './utils/readSrcFolder';

const App = () => {
  mixpanelTracker('app-launch');

  return (
    <Provider store={store}>
      <HashRouter>
        <Bar />
        <Switch>
          <Route exact path="/" render={() => <Menu />} />
          <Route path="/manager" component={managerLoader(<Manager />)} />
          <Route path="/creator" component={creatorLoader(<Creator />, 'cra')} />
          <Route path="/creatorVite" component={creatorLoader(<CreatorVite />, 'vite')} />
          <Route path="/success" component={SuccessPage} />
        </Switch>
      </HashRouter>
    </Provider>
  );
};

export const Menu = () => {
  const projectLoading = useAppSelector((state) => state.project.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!projectLoading) {
      dispatch(resetProject());
    }
  }, []);

  return (
    <div className="relative bg-gray-50 dark:bg-primary space-y-8 overflow-y-auto flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center space-y-4 mb-12">
        <div className="flex rounded flex-col items-center space-y-4 justify-around font-extrabold text-4xl">
          <img src="../assets/icons/png/64x64.png" alt="icon" />
          <span className="dark:text-white">Reactirator</span>
        </div>
        <div>
          A{' '}
          <button
            id="open_react"
            className="text-indigo-600 font-medium transition duration-200 cursor-pointer"
          >
            React
          </button>{' '}
          application manager tool.
        </div>
      </div>
      <div className="flex justify-center items-center divide-x-2 divide-gray-200 w-2/3">
        <CreatorMenuSelection />
        <ManagerMenuSelection />
      </div>
    </div>
  );
};

export const creatorLoader = (creator: JSX.Element, starterChoice: starterType) => {
  return () => {
    const [packageJson, dispatchJson] = useReducer(
      jsonPackageReducer,
      JSON.parse(
        JSON.stringify(starterChoice === 'cra' ? initialPackageJsonCRA : initialPackageJsonVite)
      )
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getVersionsOfBaseDeps = async (): Promise<void> => {
      for (const ele in packageJson.dependencies) {
        const res = await searchOnePackage(ele);
        dispatchJson({
          type: 'ADD',
          payload: {
            category: 'dependencies',
            name: res.collected.metadata.name,
            version: res.collected.metadata.version,
          },
        });
      }
      for (const ele in packageJson.devDependencies) {
        const res = await searchOnePackage(ele);
        dispatchJson({
          type: 'ADD',
          payload: {
            category: 'devDependencies',
            name: res.collected.metadata.name,
            version: res.collected.metadata.version,
          },
        });
      }
    };

    useEffect(() => {
      (async () => {
        try {
          await getVersionsOfBaseDeps();
        } catch (error) {
          console.log(error.message);
          setError(true);
        } finally {
          setLoading(false);
        }
      })();
      return setError(false);
    }, []);

    if (error)
      return (
        <div className="pt-8 flex flex-col justify-center items-center font-bold text-2xl h-screen space-y-8">
          <div>Error server, retry later</div>
          <Link
            to="/"
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowLeftIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Menu
          </Link>
        </div>
      );
    if (loading)
      return (
        <div className="pt-8 flex flex-col justify-center items-center font-bold text-2xl h-screen space-y-8">
          <ClipLoader color="#3672D7" loading={loading} size={150} />
          <div>Loading...</div>
        </div>
      );
    return (
      <PackageJsonProvider packageJson={packageJson} dispatchJson={dispatchJson}>
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
        async (event: Electron.IpcRendererEvent, arg) => {
          const [filepath] = arg;
          try {
            //const projectSrc = await readSrcFolder(`${filepath}/src`);
            const content = await promisifyReadFs(`${filepath}/package.json`);
            const contentObj = JSON.parse(content);
            const starter = findStarter(contentObj);
            const scriptDev =
              findStartScript(starter) ||
              (contentObj.scripts.dev && 'dev') ||
              (contentObj.scripts.start && 'start');
            if (contentObj.dependencies.react) {
              const newTaskList: Record<string, taskType> = {};
              Object.keys(contentObj.scripts).map(
                (ele) =>
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
                  starter: starter,
                  scriptDev: scriptDev,
                  isTypescript: contentObj.dependencies.typescript ? true : false,
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
                  devDependencies: contentObj.devDependencies
                    ? formatDeps(contentObj.devDependencies, true)
                    : {},
                  depSelected: {
                    depName: Object.keys(contentObj.dependencies)[0],
                    depVersion: Object.entries(formatDeps(contentObj.dependencies, true))[0][1]
                      .version,
                    isDevDep: false,
                  },
                })
              );
              //dispatch(initProjectSrc(projectSrc));
              mixpanelTracker('project-open', {
                projectName: contentObj.name,
                starter: starter,
                scriptDev: scriptDev,
                isTypescript: contentObj.dependencies.typescript ? true : false,
              });
              setLoading(false);
            } else {
              history.push('/');
              alert('This is not a react project!');
            }
          } catch (error) {
            console.log(error);
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

export default App;
