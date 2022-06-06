// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { projectStateType } from '../manager/helpers/types';

const initialState: projectStateType = {
  projectName: '',
  projectPath: '',
  isTypescript: false,
  loading: true,
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    resetProject: (state) => {
      state.loading = initialState.loading;
      state.projectName = initialState.projectName;
      state.projectPath = initialState.projectPath;
      state.isTypescript = initialState.isTypescript;
    },
    initProject: (state: projectStateType, action: PayloadAction<projectStateType>) => {
      state.loading = false;
      state.projectName = action.payload.projectName;
      state.projectPath = action.payload.projectPath;
      state.isTypescript = action.payload.isTypescript;
    },
  },
});

export const { resetProject, initProject } = projectSlice.actions;

export default projectSlice.reducer;
