import { depStateType } from '../helpers/types';

const dependenciesReducer = (state: depStateType, { type, payload }: {type: string, payload: {category: string, name: string}}) => {
    switch (type) {
        case 'ADD':
          if (payload.category === 'dependencies') {
            state['dependencies'].push(payload.name);
            return {...state};
          } else {
            state['devDependencies'].push(payload.name);
            return {...state};
          }
        case 'REMOVE':
          if (payload.category === 'dependencies') {
            const newDeps = state['dependencies'].filter((ele) => ele !== payload.name);
            return {...state, dependencies: newDeps};
          } else {
            const newDeps = state['devDependencies'].filter((ele) => ele !== payload.name);
            return {...state, devDependencies: newDeps};
          }
        default:
          throw new Error();
    }
}

export default dependenciesReducer;
