import { configureStore } from '@reduxjs/toolkit';
import dependenciesSlice from './slices/dependenciesSlice';
import projectReducer from './slices/projectSlice';
import projectSrcSlice from './slices/projectSrcSlice';
import taskSlice from './slices/taskSlice';

export const store = configureStore({
  reducer: {
    project: projectReducer,
    tasks: taskSlice,
    dependencies: dependenciesSlice,
    projectSrc: projectSrcSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
