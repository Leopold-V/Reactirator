// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialStructure from '../manager/helpers/initialStructure';
import { FileStructureType, projectSrcStateType } from '../manager/helpers/types';

const initialState: projectSrcStateType = {
  projectSrc: initialStructure
};

export const projectSrcSlice = createSlice({
  name: 'projectSrc',
  initialState,
  reducers: {
    initProjectSrc: (state: projectSrcStateType, action: PayloadAction<FileStructureType[]>) => {
      state.projectSrc = action.payload;
    },
  },
});

export const { initProjectSrc } = projectSrcSlice.actions;

export default projectSrcSlice.reducer;
