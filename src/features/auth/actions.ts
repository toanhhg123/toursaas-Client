import { getMe } from '@/services/auth'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUserDetailsFaild, getUserDetailsSuccess } from '.'

export const getUserDetailsThunk = createAsyncThunk(
  'authSlice/getUserDetailsThunk',
  async (params: undefined, apiThunk) => {
    try {
      const { data } = await getMe()
      apiThunk.dispatch(getUserDetailsSuccess(data))
    } catch (error) {
      apiThunk.dispatch(getUserDetailsFaild())
    }
  },
)
