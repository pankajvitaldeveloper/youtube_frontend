import { configureStore } from '@reduxjs/toolkit'
import counterReducer  from './features/counterSlice.jsx'
import videoReducer  from './slices/videoSlice.jsx'
import authReducer from './slices/authSlice.js'
import commentReducer from './slices/commentSlice.jsx'
import channelReducer from './slices/channelSlice.jsx'
export default configureStore({
  reducer: {
    counter: counterReducer,
    videos: videoReducer,
    auth: authReducer,
    comments: commentReducer,
    channel: channelReducer 
  },
})