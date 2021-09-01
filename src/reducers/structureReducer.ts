import { FileStructureType } from "../helpers/types";

const structureReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'ADD':
            state.push(action.payload);
            console.log(state);
            return [...state];
        case 'REMOVE':
            const newState = state.filter((ele: FileStructureType) => ele.id !== action.payload.id && ele.ancestor !== action.payload.id);
            return [...newState];
        case 'EDIT':
            const index = state.findIndex((ele: FileStructureType) => ele.name === action.payload.name);
            state[index].name = action.payload.newName;
            return [...state];
    }
}

export default structureReducer;