import { createSlice } from '@reduxjs/toolkit'

export const taskSlice = createSlice({
  name: 'task',
  initialState: {
    enabled: false,
    taskState: 'Idle',
    isKill: false
  },
  reducers: {
    switchTask: state => {
      state.enabled = !state.enabled;
    },
    idleTask: state => {
        state.taskState = 'Idle';
        state.enabled = false;
        state.isKill = false;
    },
    pendingTask: state => {
        state.taskState = 'Pending';
        state.enabled = true;
    },
    finishTask: state => {
        state.taskState = 'Success';
        state.enabled = false;
        if (state.isKill) {
          state.taskState = 'Error';
        }
        state.isKill = false;
    },
    stopTask: state => {
        state.taskState = 'Error';
        state.enabled = false;
        state.isKill = true;
    },
    errorTask: state => {
        state.taskState = 'Error';
        state.enabled = false;
        state.isKill = false;
    },
  }
})

export const { switchTask, idleTask, pendingTask, finishTask, stopTask, errorTask } = taskSlice.actions

export default taskSlice.reducer