const packageReducer = (state: any, { type, payload }: {type: string, payload: {name: string, version: string}}) => {
    switch (type) {
        case 'CHANGE_NAME':
          state.name = payload;
          return {...state};
        case 'ADD':
          state.dependencies[payload.name] = payload.version
          return {...state};
        case 'REMOVE':
          delete state.dependencies[payload.name];
          return {...state};
        case 'tailwind':
          if (!state.dependencies['@craco/craco']) {
            state.dependencies['@craco/craco'] = '^6.1.2';
            state.scripts.start = "craco start";
            state.scripts.build = "craco build";
            state.scripts.test = "craco test";
            if (!state.devDependencies) {
              state.devDependencies = {};
            }
            state.devDependencies['@tailwindcss/postcss7-compat'] = "^2.1.2";
            state.devDependencies['autoprefixer'] = "^9.8.6";
            state.devDependencies['postcss'] = "^7.0.35";
            state.devDependencies['tailwindcss'] = "npm:@tailwindcss/postcss7-compat@^2.1.2";
            return {...state};
          } else {
            delete state.dependencies['@craco/craco'];
            state.scripts.start = 'npm start';
            state.scripts.build = 'npm build';
            state.scripts.test = 'npm test';
            delete state.devDependencies['@tailwindcss/postcss7-compat'];
            delete state.devDependencies['autoprefixer'];
            delete state.devDependencies['postcss'];
            delete state.devDependencies['tailwindcss'];
            return {...state};
          }
        case 'storybook':
          if (!state.scripts['storybook']) {
            state.scripts['storybook'] = "start-storybook -p 6006 -s public";
            state.scripts['build-storybook'] = "build-storybook -s public";
            if (!state.devDependencies) {
              state.devDependencies = {};
            }
            state.devDependencies["@storybook/addon-actions"] = "^6.2.9";
            state.devDependencies["@storybook/addon-essentials"] = "^6.2.9";
            state.devDependencies["@storybook/addon-links"] = "^6.2.9";
            state.devDependencies["@storybook/node-logger"] = "^6.2.9";
            state.devDependencies["@storybook/preset-create-react-app"] = "^^3.1.7";
            state.devDependencies["@storybook/addon-actions"] = "^6.2.9";
            state.devDependencies["@storybook/react"] = "^6.2.9";
            return {...state};
          } else {
            delete state.scripts['storybook'];
            delete state.scripts['build-storybook'];
            delete state.devDependencies["@storybook/addon-actions"];
            delete state.devDependencies["@storybook/addon-essentials"];
            delete state.devDependencies["@storybook/addon-links"]
            delete state.devDependencies["@storybook/node-logger"]
            delete state.devDependencies["@storybook/preset-create-react-app"]
            delete state.devDependencies["@storybook/addon-actions"]
            delete state.devDependencies["@storybook/react"]
            return {...state};
          }
        case 'prettier': {
          if (!state.devDependencies?.prettier) {
            if (!state.devDependencies) {
              state.devDependencies = {};
            }
            state.devDependencies["prettier"] = "2.2.1";
            return {...state};
          } else {
            delete state.devDependencies["prettier"];
            return {...state};
          }
        }
        case 'flow': {
          if (!state.dependencies['flow']) {
            state.dependencies['flow-bin'] = "^0.150.0";
            state.scripts['flow'] = 'flow';
            return {...state};
          } else {
            delete state.dependencies['flow-bin'];
            return {...state};
          }
        }
        case 'bootstrap': {
          if (!state.dependencies['bootstrap']) {
            state.dependencies['bootstrap'] = "^4.6.0";
            return {...state};
          } else {
            delete state.dependencies['bootstrap'];
            return {...state};
          }
        }
        case 'sourcemapexplorer': {
          if (!state.dependencies['source-map-explorer']) {
            state.dependencies['source-map-explorer'] = "^2.5.2";
            state.scripts['analyze'] = "source-map-explorer 'build/static/js/*.js'";
            return {...state};
          } else {
            delete state.dependencies['flow-bin'];
            return {...state};
          }
        }
        case 'typescript': {
          return {...state};
        }
        default:
          throw new Error();
    }
}

export default packageReducer;
