import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import api from "@/api"
import { FormLogin, FormRegister, UserState } from "@/types"

const initialState: UserState = {
  users: [],
  user: null,
  isLoading: false,
  error: null
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
  async ({ currentPage, itemsPerPage }: {currentPage:number, itemsPerPage:number}) => {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("No token available")
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await api.get(`/users?page=${currentPage}&limit=${itemsPerPage}`, config)
    const users = response.data.$values
    console.log(users)
    return response.data
  }
)

const userReducer = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.data.$values
        state.isLoading = false
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
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

export default userReducer.reducer
