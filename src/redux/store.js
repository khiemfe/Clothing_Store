import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../redux/slices/productSlice'
import userReducer from '../redux/slices/userSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer
  },
})

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch