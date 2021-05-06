import { actionPackageType, depStateType } from '../helpers/types';

const dependenciesReducer = (state: depStateType, { type, payload }: actionPackageType) => {
    switch (type) {
        case 'ADD':
          if (payload.destination === 'dependencies') {
            state['dependencies'].push(payload.name);
            return {...state};
          } else {
            state['devDependencies'].push(payload.name);
            return {...state};
          }
        case 'REMOVE':
          if (payload.destination === 'dependencies') {
            const newDeps = state['dependencies'].filter((ele) => ele !== payload.name);
            return {...state, dependencies: newDeps};
          } else {
            const newDeps = state['devDependencies'].filter((ele) => ele !== payload.name);
            return {...state, devDependencies: newDeps};
          }
        case 'CHANGE_TYPE':
            // @ts-ignore
            const newDeps = state[payload.source].filter((ele: any) => ele !== payload.name);
            // @ts-ignore
            state[payload.destination].push(payload.name);
            return {...state, [payload.source]: newDeps};
        default:
          throw new Error();
    }
}

export default dependenciesReducer;
