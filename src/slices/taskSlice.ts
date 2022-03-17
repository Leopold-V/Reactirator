// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tasksStateType } from '../manager/helpers/types';

const initialState: tasksStateType = {
  tasks: {}
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    initTasks: (state, action: PayloadAction<tasksStateType>) => {
      state.tasks = action.payload.tasks;
    },
    switchTask: (state, action: PayloadAction<string>) => {
      state.tasks[action.payload].enabled = !state.tasks[action.payload].enabled;
    },
    idleTask: (state, action: PayloadAction<string>) => {
      state.tasks[action.payload].taskState = 'Idle';
      state.tasks[action.payload].enabled = false;
      state.tasks[action.payload].isKill = false;
    },
    pendingTask: (state, action: PayloadAction<string>) => {
      state.tasks[action.payload].logs = '';
      state.tasks[action.payload].taskState = 'Pending';
      state.tasks[action.payload].enabled = true;
    },
    finishTask: (state, action: PayloadAction<string>) => {
      state.tasks[action.payload].taskState = 'Success';
      state.tasks[action.payload].enabled = false;
      if (state.tasks[action.payload].isKill) {
        state.tasks[action.payload].taskState = 'Error';
      }
      state.tasks[action.payload].isKill = false;
    },
    stopTask: (state, action: PayloadAction<string>) => {
      state.tasks[action.payload].taskState = 'Error';
      state.tasks[action.payload].enabled = false;
      state.tasks[action.payload].isKill = true;
      state.tasks[action.payload].logs += '\n\n Task aborted.';
    },
    errorTask: (state, action: PayloadAction<{ taskName: string; logs: string }>) => {
      state.tasks[action.payload.taskName].isKill = true;
      state.tasks[action.payload.taskName].logs = action.payload.logs;
    },
    updateLogs: (state, action: PayloadAction<{ taskName: string; logs: string }>) => {
      state.tasks[action.payload.taskName].logs += action.payload.logs;
    },
    clearLogs: (state, action: PayloadAction<string>) => {
      state.tasks[action.payload].logs = '';
    }
  }
});

export const {
  clearLogs,
  initTasks,
  switchTask,
  idleTask,
  pendingTask,
  finishTask,
  stopTask,
  errorTask,
  updateLogs,
} = taskSlice.actions;

export default taskSlice.reducer;