import { actionTaskType } from '../helpers/types';

const taskReducer = (state: any, { type, payload }: actionTaskType) => {
  console.log(type);
  switch (type) {
    case 'SWITCH':
      state.enabled = !state.enabled;
      return { ...state };
    case 'IDLE':
      state.taskState = 'Idle';
      state.enabled = false;
      state.isKill = false;
      return { ...state };
    case 'PENDING':
      state.taskState = 'Pending';
      state.enabled = true;
      return { ...state };
    case 'FINISH':
      state.taskState = 'Success';
      state.enabled = false;
      if (state.isKill) {
        state.taskState = 'Error';
      }
      state.isKill = false;
      return { ...state };
    case 'STOP':
      state.taskState = 'Error';
      state.enabled = false;
      state.isKill = true;
      return { ...state };
    case 'ERROR':
      state.taskState = 'Error';
      state.enabled = false;
      state.isKill = false;
      return { ...state };
    default:
      throw new Error();
  }
};

export default taskReducer;
