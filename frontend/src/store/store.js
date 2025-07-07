import { configureStore } from '@reduxjs/toolkit'
import musicReducer from './musicSlice'

export const store = configureStore({
  reducer: {
    music: musicReducer
  }
})