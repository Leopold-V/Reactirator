import { actionJsonType } from '../helpers/types';

const jsonPackageReducer = (state: any, action: actionJsonType) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      state.name = action.payload;
      return { ...state };
    case 'ADD':
      state[action.payload.category][action.payload.name] = action.payload.version;
      return { ...state };
    case 'REMOVE':
      delete state[action.payload.category][action.payload.name];
      return { ...state };
    case 'tailwind':
      return addTailwind(state, action.payload.version);
    case 'storybook':
      return addStorybook(state, action.payload.version);
    case 'prettier':
      return addPrettier(state, action.payload.version);
    case 'flow':
      return addFlow(state, action.payload.version);
    case 'bootstrap':
      return addBootstrap(state, action.payload.version);
    case 'sourcemapexplorer':
      return addSourcemapexplorer(state, action.payload.version);
    case 'normalize':
      return { ...state };
    case 'typescript':
      return addTypescript(state);
    default:
      throw new Error();
  }
};

export default jsonPackageReducer;

const addPrettier = (state: any, version: string) => {
  if (!state.devDependencies.prettier) {
    state.devDependencies['prettier'] = `${version}`;
  } else {
    delete state.devDependencies['prettier'];
  }
  return { ...state };
};

const addBootstrap = (state: any, version: string) => {
  if (!state.dependencies['bootstrap']) {
    state.dependencies['bootstrap'] = `^${version}`;
  } else {
    delete state.dependencies['bootstrap'];
  }
  return { ...state };
};

const addSourcemapexplorer = (state: any, version: string) => {
  if (!state.dependencies['source-map-explorer']) {
    state.dependencies['source-map-explorer'] = `^${version}`;
    state.scripts['analyze'] = "source-map-explorer 'build/static/js/*.js'";
  } else {
    delete state.dependencies['source-map-explorer'];
    delete state.scripts['analyze'];
  }
  return { ...state };
};

const addFlow = (state: any, version: string) => {
  if (!state.dependencies['flow-bin']) {
    state.dependencies['flow-bin'] = `^${version}`;
    state.scripts['flow'] = 'flow';
  } else {
    delete state.dependencies['flow-bin'];
    delete state.scripts['flow'];
  }
  return { ...state };
};

const addTypescript = (state: any): any => {
  if (!state.devDependencies['typescript']) {
    state.devDependencies['typescript'] = '^4.2.4';
    state.devDependencies['@types/jest'] = '^26.0.23';
    state.devDependencies['@types/node'] = '^12.20.11';
    state.devDependencies['@types/react'] = '^17.0.4';
    state.devDependencies['@types/react-dom'] = '^17.0.3';
  } else {
    delete state.devDependencies['typescript'];
    delete state.devDependencies['@types/jest'];
    delete state.devDependencies['@types/node'];
    delete state.devDependencies['@types/react'];
    delete state.devDependencies['@types/react-dom'];
  }
  return { ...state };
};

const addTailwind = (state: any, version: string): any => {
  if (!state.dependencies['@craco/craco']) {
    state.dependencies['@craco/craco'] = '^6.1.2';
    state.scripts.start = 'craco start';
    state.scripts.build = 'craco build';
    state.scripts.test = 'craco test';
    state.devDependencies['@tailwindcss/postcss7-compat'] = `^${version}`;
    state.devDependencies['autoprefixer'] = '^9.8.6';
    state.devDependencies['postcss'] = '^7.0.35';
    state.devDependencies['tailwindcss'] = `npm:@tailwindcss/postcss7-compat@^${version}`;
  } else {
    delete state.dependencies['@craco/craco'];
    state.scripts.start = 'npm start';
    state.scripts.build = 'npm build';
    state.scripts.test = 'npm test';
    delete state.devDependencies['@tailwindcss/postcss7-compat'];
    delete state.devDependencies['autoprefixer'];
    delete state.devDependencies['postcss'];
    delete state.devDependencies['tailwindcss'];
  }
  return { ...state };
};

const addStorybook = (state: any, version: string): any => {
  if (!state.scripts['storybook']) {
    state.scripts['storybook'] = 'start-storybook -p 6006 -s public';
    state.scripts['build-storybook'] = 'build-storybook -s public';
    state.devDependencies['@storybook/addon-actions'] = `^${version}`;
    state.devDependencies['@storybook/addon-essentials'] = `^${version}`;
    state.devDependencies['@storybook/addon-links'] = `^${version}`;
    state.devDependencies['@storybook/node-logger'] = `^${version}`;
    state.devDependencies['@storybook/preset-create-react-app'] = '^3.1.7';
    state.devDependencies['@storybook/addon-actions'] = `^${version}`;
    state.devDependencies['@storybook/react'] = `^${version}`;
  } else {
    delete state.scripts['storybook'];
    delete state.scripts['build-storybook'];
    delete state.devDependencies['@storybook/addon-actions'];
    delete state.devDependencies['@storybook/addon-essentials'];
    delete state.devDependencies['@storybook/addon-links'];
    delete state.devDependencies['@storybook/node-logger'];
    delete state.devDependencies['@storybook/preset-create-react-app'];
    delete state.devDependencies['@storybook/addon-actions'];
    delete state.devDependencies['@storybook/react'];
  }
  return { ...state };
};
