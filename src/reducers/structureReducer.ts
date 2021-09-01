import { FileStructureType } from "../helpers/types";

const structureReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'ADD':
            state.push(action.payload);
            return [...state];
        case 'REMOVE':
            const newState = state.filter((ele: FileStructureType) => ele.name !== action.payload.name);
            return [...newState];
    }
}

export default structureReducer;