import { depStateType } from '../helpers/types';

const dependenciesReducer = (state: depStateType, { type, payload }: {type: string, payload: {category: string, name: string}}) => {
    switch (type) {
        case 'ADD':
          state[payload.category].push(payload.name);
          return {...state};
        case 'REMOVE':
          const newState = state[payload.category].filter((ele) => ele !== payload.name);
          return {...newState};
        default:
          throw new Error();
    }
}

export default dependenciesReducer;
