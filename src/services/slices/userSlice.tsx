import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import api from "@/api"
import { FormLogin, FormRegister, UserState } from "@/types"
import { TokenConfig } from "../TokenConfig"

const initialState: UserState = {
  users: [],
  user: null,
  isLoading: false,
  isLoggedIn: false,
  error: null
}

// Load state from localStorage if it exists
const savedState = localStorage.getItem("loginUserData")
if (savedState) {
  const parsedState = JSON.parse(savedState)
  initialState.user = parsedState.user
  initialState.isLoggedIn = parsedState.isLoggedIn
}

export const registerUser = createAsyncThunk("users/registerUser", async (data: FormRegister) => {
  const response = await api.post("/users/signUp", data)
  return response.data
})

export const loginUser = createAsyncThunk("users/loginUser", async (data: FormLogin) => {
  const response = await api.post("/users/signIn", data)
  const token = response.data.data.token
  localStorage.setItem("token", token)
  return response.data
})

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ currentPage, itemsPerPage }: { currentPage: number; itemsPerPage: number }) => {
    const config = TokenConfig()
    const response = await api.get(`/users?page=${currentPage}&limit=${itemsPerPage}`, config)
    return response.data
  }
)

const userReducer = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.isLoggedIn = false
      localStorage.removeItem("loginUserData")
      localStorage.removeItem("token")
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.data
        state.isLoading = false
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.data.userSignIn
        state.isLoggedIn = true
        localStorage.setItem(
          "loginUserData",
          JSON.stringify({
            user: state.user,
            isLoggedIn: state.isLoggedIn
          })
        )
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.error = null
          state.isLoading = true
        }
      )
  }
})

export const { logout } = userReducer.actions

export default userReducer.reducer
