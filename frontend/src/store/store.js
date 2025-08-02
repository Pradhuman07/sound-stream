import { configureStore } from '@reduxjs/toolkit'
import musicReducer from './musicSlice'
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    music: musicReducer,
    auth: authReducer
  }
})

// Make store available globally for API interceptor
window.store = store