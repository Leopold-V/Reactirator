const packageReducer = (state: any, { type, payload }: {type: string, payload: string}) => {
    switch (type) {
        case 'ADD':
          return {...state, payload};
        case 'REMOVE':
          const newState = state.filter((ele: string) => ele !== payload);
          return {...newState};
        default:
          throw new Error();
    }
}

export default packageReducer;
