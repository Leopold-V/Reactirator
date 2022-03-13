import React, { useEffect, useReducer, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { ipcRenderer } from 'electron';
import { Provider } from 'react-redux';
import { HashRouter, Link, Route, Switch, useHistory } from 'react-router-dom';
import {store} from './store';
import { promisifyReadFs } from './utils/promisifyFs';
import { tasksStateType, taskType } from './manager/helpers/types';
import initialPackageJson from './creator/helpers/initialPackageJson';
import { getSizeOfPackagesList, searchPackages } from './services/package.service';
import jsonPackageReducer from './creator/reducers/jsonPackageReducer';
import { ProjectDataProvider } from './manager/components/Contexts/ProjectDataProvider';
import { PackageJsonProvider } from './creator/components/Contexts/PackageJsonProvider';
import { DependenciesProvider } from './creator/components/Contexts/dependenciesProvider';
import { GithubProvider } from './creator/components/Contexts/GithubProvider';

import { Bar } from './common/Bar';
import { Card } from './common/Card';
import Creator from './creator';
import Manager from './manager';
import { dispatch } from 'd3';
import { useAppDispatch } from './hooks';
import { fetchProject, initProject } from './slices/projectSlice';

const App = () => {
  const [theme, setTheme] = useState(localStorage.theme);
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <HashRouter>
      <Bar />
      <Switch>
        <Route exact path="/" render={() => <Menu />} />
        <Route
          path="/manager"
          component={managerLoader(<Manager theme={theme} setTheme={setTheme} />)}
        />
        <Route
          path="/creator"
          component={creatorLoader(<Creator theme={theme} setTheme={setTheme} />)}
        />
      </Switch>
    </HashRouter>
  );
};

const Menu = () => {
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
        <div className="pt-8 flex justify-center items-center font-extrabold text-4xl h-screen">
          Loading...
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

/*
'taskState': 'Idle',
'enabled': false,
'isKill': false
*/

const managerLoader = (manager: JSX.Element) => {
  return () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
      ipcRenderer.send('open-directory');
      ipcRenderer.on('open-dialog-directory-not-selected', () => {
        history.push('/');
      });
      ipcRenderer.on(
        'open-dialog-directory-selected',
        async (event: Electron.IpcRendererEvent, arg: any) => {
          const [filepath] = arg;
          if (arg) {
            store.dispatch(fetchProject(filepath)).then(() => {
              setLoading(false);
            });
          }
        }
      );
      return () => {
        ipcRenderer.removeAllListeners('open-dialog-directory-selected');
        ipcRenderer.removeAllListeners('open-dialog-directory-not-selected');
      };
    }, []);

    /*
    useEffect(() => {
      if (data) {
        setLoading(false);
      }
    }, [data]);*/

    if (store.getState().project.loading)
      return (
        <div className="pt-8 flex justify-center items-center font-extrabold text-4xl h-screen">
          Loading...
        </div>
      );
    return (
      <Provider store={store}>
        <ProjectDataProvider projectData={data} setProjectData={setData}>
          {manager}
        </ProjectDataProvider>
      </Provider>
    );
  };
};

function render() {
  ReactDOM.render(<App />, document.querySelector('#app'));
}

render();
