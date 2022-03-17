// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dependenciesStateType, depType } from '../manager/helpers/types';

const initialState: dependenciesStateType = {
  dependencies: {},
  devDependencies: {},
  depSelected: {
    depName: '',
    depVersion: '',
    isDevDep: false
  }
};

export const dependenciesSlice = createSlice({
  name: 'dependencies',
  initialState,
  reducers: {
    initDependencies:  (
      state: dependenciesStateType,
      action: PayloadAction<dependenciesStateType>
    ) => {
      state.dependencies = action.payload.dependencies;
      state.devDependencies = action.payload.devDependencies;
      state.depSelected = action.payload.depSelected;
    },
    selectDep: (state: dependenciesStateType, action: PayloadAction<depType>) => {
      state.depSelected = action.payload;
    }
  }
});

export const {
    initDependencies,
    selectDep
} = dependenciesSlice.actions;

export default dependenciesSlice.reducer;
