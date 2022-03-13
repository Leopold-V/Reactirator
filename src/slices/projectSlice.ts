// eslint-disable-next-line import/named
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { promisifyReadFs } from '../utils/promisifyFs';
import { projectStateType, taskType } from '../manager/helpers/types';

const initialState: projectStateType = {
  projectName: '',
  projectPath: '',
  loading: true,
  tasks: {},
};

export const fetchProject = createAsyncThunk('project/initProject', async (filepath: string, { rejectWithValue }) => {
  try {
    const content = await promisifyReadFs(`${filepath}/package.json`);
    const contentObj = JSON.parse(content);
    if (contentObj.dependencies?.react) {
      const newTaskList: Record<string, taskType> = {}; 
      Object.keys(contentObj.scripts).map((ele: any) => (
        newTaskList[ele] = {
            'taskState': 'Idle',
            'enabled': false,
            'isKill': false
          }
        )
      )
      return { projectName: contentObj.name, projectPath: filepath[0], tasks: newTaskList };
    } else {
      alert('This is not a React project !');
      return rejectWithValue('This is not a React project !');
    }
  } catch (error) {
    return rejectWithValue('Error');
  }
})

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    initProject: (state, action: PayloadAction<projectStateType>) => {
      console.log(action.payload);
      state = action.payload;
    },
    initTasks: (state, action: PayloadAction<Record<string, taskType>>) => {
      state.tasks = action.payload;
    },
    switchTask: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      state.tasks[action.payload].enabled = !state.tasks[action.payload].enabled;
    },
    idleTask: (state, action: PayloadAction<string>) => {
      state.tasks[action.payload].taskState = 'Idle';
      state.tasks[action.payload].enabled = false;
      state.tasks[action.payload].isKill = false;
    },
    pendingTask: (state, action: PayloadAction<string>) => {
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
    },
    errorTask: (state, action: PayloadAction<string>) => {
      state.tasks[action.payload].taskState = 'Error';
      state.tasks[action.payload].enabled = false;
      state.tasks[action.payload].isKill = false;
    },
  },
  extraReducers: {
    [fetchProject.pending.toString()]: (state: projectStateType) => {
      console.log('pending');
      state.loading = true;
    },
    [fetchProject.fulfilled.toString()]: (state: projectStateType, action: PayloadAction<projectStateType>) => {
      console.log('fulfilled');
      state.loading = false;
      state = action.payload;
    },
    [fetchProject.rejected.toString()]: (state: projectStateType) => {
      console.log('rejected');
      state.loading = false;
      //state.error = action.payload;
    },
  }
});

export const { initProject, initTasks, switchTask, idleTask, pendingTask, finishTask, stopTask, errorTask } =
  projectSlice.actions;

export default projectSlice.reducer;
