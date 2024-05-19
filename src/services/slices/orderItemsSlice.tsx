import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import api from "@/api"
import { OrderItem } from "@/types"

export type orderItemsStates = {
  orderItems: OrderItem[]
  orderItem: OrderItem | null
  isLoading: boolean
  error: string | null
}
const initialState: orderItemsStates = {
  orderItems: [],
  orderItem: null,
  isLoading: false,
  error: null
}

export const fetchCart = createAsyncThunk("orderItems/fetchCart", async () => {
  const token = localStorage.getItem("token")
  if (!token) {
    throw new Error("No token available")
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await api.get("/orderItems/cart", config)
  return response.data
})

const orderItemReducer = createSlice({
  name: "orderItems",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.orderItems = action.payload.data
        state.isLoading = false
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
      })
      .addCase(fetchCart.pending, (state) => {
        state.error = null
        state.isLoading = true
      })
  }
})

export default orderItemReducer.reducer
