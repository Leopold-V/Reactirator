import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './slices/taskSlice'

export default configureStore({
  reducer: {
    task: taskReducer
  }
})