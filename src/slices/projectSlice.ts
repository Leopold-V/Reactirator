// eslint-disable-next-line import/named
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { promisifyReadFs } from '../utils/promisifyFs';
import { projectStateType, taskType } from '../manager/helpers/types';

const initialState: projectStateType = {
  projectName: '',
  projectPath: '',
  loading: true,
  tasks: {},
  dependencies: {},
  devDependencies: {},
};

export const fetchProject = createAsyncThunk(
  'project/initProject',
  async (filepath: string, { rejectWithValue }) => {
    try {
      const content = await promisifyReadFs(`${filepath}/package.json`);
      const contentObj = JSON.parse(content);
      // TODO:
      // Should check react-script to verify if it is a create-react-app and not a react application in general ?
      if (contentObj.dependencies.react) {
        const newTaskList: Record<string, taskType> = {};
        Object.keys(contentObj.scripts).map(
          (ele: any) =>
            (newTaskList[ele] = {
              taskState: 'Idle',
              enabled: false,
              isKill: false,
              logs: '',
            })
        );
        return {
          projectName: contentObj.name,
          projectPath: filepath[0],
          tasks: newTaskList,
          dependencies: contentObj.dependencies,
          devDependencies: contentObj.devDependencies,
        };
      }
    } catch (error) {
      console.log(error.message);
      return rejectWithValue('This is not a React project !');
    }
  }
  //return rejectWithValue('This is not a React project !');
);

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    resetProject: (state) => {
      state.loading = initialState.loading;
      state.projectName = initialState.projectName;
      state.projectPath = initialState.projectPath;
      state.tasks = initialState.tasks;
      state.dependencies = initialState.dependencies;
      state.devDependencies = initialState.devDependencies;
    },
    initTasks: (state, action: PayloadAction<Record<string, taskType>>) => {
      state.tasks = action.payload;
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
      state.tasks[action.payload.taskName].taskState = 'Error';
      state.tasks[action.payload.taskName].enabled = false;
      state.tasks[action.payload.taskName].isKill = false;
      state.tasks[action.payload.taskName].logs = action.payload.logs;
    },
    updateLogs: (state, action: PayloadAction<{ taskName: string; logs: string }>) => {
      state.tasks[action.payload.taskName].logs += action.payload.logs;
    },
    clearLogs: (state, action: PayloadAction<string>) => {
      state.tasks[action.payload].logs = '';
    },
    initProject:  (
      state: projectStateType,
      action: PayloadAction<projectStateType>
    ) => {
      state.loading = false;
      state.projectName = action.payload.projectName;
      state.projectPath = action.payload.projectPath;
      state.dependencies = action.payload.dependencies;
      state.devDependencies = action.payload.devDependencies;
      state.tasks = action.payload.tasks;
    }
  }
});

export const {
  clearLogs,
  resetProject,
  initTasks,
  switchTask,
  idleTask,
  pendingTask,
  finishTask,
  stopTask,
  errorTask,
  updateLogs,
  initProject
} = projectSlice.actions;

export default projectSlice.reducer;
