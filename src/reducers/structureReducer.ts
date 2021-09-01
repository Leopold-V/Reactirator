import { FileStructureType } from "../helpers/types";

const structureReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'ADD':
            state.push(action.payload);
            return [...state];
        case 'REMOVE':
            const newState = state.filter((ele: FileStructureType) => ele.name !== action.payload.name && ele.ancestor !== action.payload.name);
            return [...newState];
        case 'EDIT':
            const index = state.findIndex((ele: FileStructureType) => ele.name === action.payload.name);
            state[index].name = action.payload.newName;
            const updatedState = state.map((ele: FileStructureType) => {
                if (ele.ancestor === action.payload.name) {
                    ele.ancestor = action.payload.newName
                }
                return {...ele}
            })
            console.log(updatedState);
            return [...updatedState];
    }
}

export default structureReducer;