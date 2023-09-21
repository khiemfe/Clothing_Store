import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  avatar: '',
  id: '',
  access_token: '',
  isAdmin: false,
  // exp: '',
  // isLoading: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { name, email, phone, address, avatar, _id, access_token, isAdmin } = action.payload
      console.log('action', action)
      state.name = name
      state.email = email
      state.phone = phone
      state.address = address
      state.avatar = avatar
      state.id = _id
      state.access_token = access_token
      state.isAdmin = true
      // state.exp = exp
    },
    resetUser: (state) => {
      state.name = '';
      state.email = '';
      state.address = '';
      state.phone = '';
      state.avatar = '';
      state.id = '';
      state.access_token = '';
      state.isAdmin = false;
      state.city = '';
      state.refreshToken = ''
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions

export default userSlice.reducer