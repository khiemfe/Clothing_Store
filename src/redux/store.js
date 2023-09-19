import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../redux/slices/counterSlice'
import userReducer from '../redux/slices/userSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer
  },
})

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch