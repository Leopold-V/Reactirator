import { FileStructureType } from "../helpers/types";

const structureReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'ADD':
            state.push(action.payload);
            console.log(state);
            return [...state];
        case 'REMOVE':
            const newState = state.filter((ele: FileStructureType) => ele.name !== action.payload.name && ele.ancestor === action.payload.name);
            console.log(newState);
            return [...newState];
    }
}

export default structureReducer;