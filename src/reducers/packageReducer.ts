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
        default:
          throw new Error();
    }
}

export default packageReducer;
