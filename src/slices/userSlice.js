import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo")):null,
  },
  reducers: {
    activeUser: (state,action) => {
      state.userInfo = action.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { activeUser } = userSlice.actions

export default userSlice.reducer