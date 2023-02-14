import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import activeUserSlice from './slices/activeChatSlice'
export default configureStore({
  reducer: {
    userdata:userSlice,
    activeUser:activeUserSlice
  },
})