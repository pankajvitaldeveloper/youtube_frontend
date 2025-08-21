import { configureStore } from '@reduxjs/toolkit'
import counterReducer  from './features/counterSlice.jsx'
import videoReducer  from './slices/videoSlice.jsx'
import authReducer from './slices/authSlice.js'
export default configureStore({
  reducer: {
    counter: counterReducer,
    videos: videoReducer,
    auth: authReducer
  },
})