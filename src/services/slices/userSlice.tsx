import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import api from "@/api"
import { FilterUser, FormLogin, FormRegister, UserState } from "@/types"
import { TokenConfig } from "../TokenConfig"
import { UserBehavior } from "@/components/Dashboard/Admin/UpdateUser"
import { FormUpdateProfile } from "@/components/Dashboard/Profile"
import { FormUpdatePassword } from "@/components/Dashboard/UpdatePassword"

const initialState: UserState = {
  users: [],
  user: null,
  isLoading: false,
  totalUsers: 0,
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
  async ({ currentPage, itemsPerPage, sortBy, orderBy }: FilterUser) => {
    const config = TokenConfig()
    const response = await api.get(
      `/users?page=${currentPage}&limit=${itemsPerPage}&sortBy=${sortBy}&orderBy=${orderBy}`,
      config
    )
    return response.data
  }
)

export const updateProfile = createAsyncThunk(
  "users/updateProfile",
  async ({
    userProfile,
    userId
  }: {
    userProfile: FormUpdateProfile
    userId: string | undefined
  }) => {
    const config = TokenConfig()
    const response = await api.put(`/users/${userId}`, userProfile, config)
    return response.data
  }
)

export const updateUserBehavior = createAsyncThunk(
  "users/updateUserBehavior",
  async ({ userBehavior, userId }: { userBehavior: UserBehavior; userId: string | undefined }) => {
    const config = TokenConfig()
    const response = await api.put(`/users/${userId}/status`, userBehavior, config)
    return response.data
  }
)

export const updateUserPassword = createAsyncThunk(
  "users/updateUserPassword",
  async ({
    userPassword,
    userId
  }: {
    userPassword: FormUpdatePassword
    userId: string | undefined
  }) => {
    const config = TokenConfig()
    const response = await api.put(`/users/${userId}/updatePassword`, userPassword, config)
    return response.data
  }
)

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId: string | undefined) => {
    const config = TokenConfig()
    const response = await api.delete(`/users/${userId}`, config)
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
      .addCase(fetchUsers.pending, (state) => {
        state.error = null
        state.isLoading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.data.users
        state.totalUsers = action.payload.data.totalUsers
        state.isLoading = false
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
      })

      .addCase(updateUserBehavior.fulfilled, (state, action) => {
        const updatedUser = action.payload.data
        state.users = state.users.map((user) =>
          user.userId === updatedUser.userId ? updatedUser : user
        )
        state.isLoading = false
      })
      .addCase(updateUserBehavior.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        const updatedUser = action.payload.data
        state.users = state.users.map((user) =>
          user.userId === updatedUser.userId ? updatedUser : user
        )
        state.user = updatedUser
        localStorage.setItem(
          "loginUserData",
          JSON.stringify({
            user: state.user,
            isLoggedIn: state.isLoggedIn
          })
        )
        state.isLoading = false
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
      })

      .addCase(updateUserPassword.fulfilled, (state, action) => {
        const updatedUser = action.payload.data
        state.users = state.users.map((user) =>
          user.userId === updatedUser.userId ? updatedUser : user
        )
        state.user = updatedUser
        localStorage.setItem(
          "loginUserData",
          JSON.stringify({
            user: state.user,
            isLoggedIn: state.isLoggedIn
          })
        )
        state.isLoading = false
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.userId !== action.payload.data)
        state.isLoading = false
      })
      .addCase(deleteUser.rejected, (state, action) => {
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
        state.isLoading = false
      })
  }
})

export const { logout } = userReducer.actions

export default userReducer.reducer
