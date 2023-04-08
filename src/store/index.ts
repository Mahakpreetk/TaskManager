import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'
import taskSlice from './task/taskSlice'
import { reducer as notificationsReducer } from 'reapop'

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer(),
    auth: authSlice,
    tasks: taskSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch