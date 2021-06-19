import { actionPackageType, depStateType } from '../helpers/types';

const dependenciesReducer = (state: depStateType, { type, payload }: actionPackageType) => {
  switch (type) {
    case 'ADD':
      if (payload.destination === 'dependencies') {
        state['dependencies'].push({
          name: payload.name,
          size: payload.size,
          version: payload.version,
          dependencies: payload.dependencies,
        });
        return { ...state };
      } else {
        state['devDependencies'].push({
          name: payload.name,
          size: payload.size,
          version: payload.version,
          dependencies: payload.dependencies,
        });
        return { ...state };
      }
    case 'REMOVE':
      if (payload.destination === 'dependencies') {
        const newDeps = state['dependencies'].filter((ele) => ele.name !== payload.name);
        return { ...state, dependencies: newDeps };
      } else {
        const newDeps = state['devDependencies'].filter((ele) => ele.name !== payload.name);
        return { ...state, devDependencies: newDeps };
      }
    case 'CHANGE_TYPE':
      // @ts-ignore
      const dep = state[payload.source].find((ele) => ele.name === payload.name);
      // @ts-ignore
      const newDeps = state[payload.source].filter((ele) => ele.name !== payload.name);
      // @ts-ignore
      state[payload.destination].push(dep);
      return { ...state, [payload.source]: newDeps };
    default:
      throw new Error();
  }
};

export default dependenciesReducer;
