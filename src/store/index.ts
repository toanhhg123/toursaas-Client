import { configureStore } from '@reduxjs/toolkit'
import auth from '@/features/auth'

export const store = configureStore({
  reducer: {
    auth,
  },
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
