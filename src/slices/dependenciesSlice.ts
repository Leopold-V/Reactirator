// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dependenciesStateType, depSelectType, depType } from '../manager/helpers/types';

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
    selectDep: (state: dependenciesStateType, action: PayloadAction<depSelectType>) => {
      state.depSelected = action.payload;
    },
    updateDep: (state: dependenciesStateType, action: PayloadAction<depType>) => {
      const depCategory = action.payload.isDevDep ? 'devDependencies' : 'dependencies';
      const depName = action.payload.name;
      state[depCategory][depName].version = action.payload.version;
      state[depCategory][depName].status = action.payload.status;
      state[depCategory][depName].isDevDep = action.payload.isDevDep;
    },
    removeDep: (state: dependenciesStateType, action: PayloadAction<{depName: string, isDevDep: boolean}>) => {
      const depCategory = action.payload.isDevDep ? 'devDependencies' : 'dependencies';
      if (state.depSelected.depName === action.payload.depName) {
        const newSelectedDep = Object.entries(state.dependencies)[0][1];
        state.depSelected = {
          depName: newSelectedDep.name,
          depVersion: newSelectedDep.version,
          isDevDep: newSelectedDep.isDevDep
        }
      }
      delete state[depCategory][action.payload.depName];
    }
  }
});

export const {
    initDependencies,
    selectDep,
    updateDep,
    removeDep
} = dependenciesSlice.actions;

export default dependenciesSlice.reducer;
