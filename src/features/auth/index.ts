import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUserDetails } from './type'

export interface IAuthState {
  userDetails?: IUserDetails
  isLoading?: boolean
  status: 'pendding' | 'success' | 'faild'
}

const initialState: IAuthState = {
  status: 'pendding',
}

export const authSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    sendRequest: (state) => {
      state.isLoading = true
    },

    getUserDetailsSuccess: (state, action: PayloadAction<IUserDetails>) => {
      state.userDetails = action.payload
      state.status = 'success'
      state.isLoading = false
    },

    getUserDetailsFaild: (state) => {
      state.status = 'faild'
      state.isLoading = false
      state.userDetails = undefined
    },
  },
})

// Action creators are generated for each case reducer function
export const { sendRequest, getUserDetailsSuccess, getUserDetailsFaild } =
  authSlice.actions

export default authSlice.reducer
