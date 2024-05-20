import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import api from "@/api"
import { Order } from "@/types"

export type orderStates = {
  orders: Order[]
  order: Order | null
  isLoading: boolean
  error: string | null
}
const initialState: orderStates = {
  orders: [],
  order: null,
  isLoading: false,
  error: null
}

export const fetchOrder = createAsyncThunk("order/fetchOrder", async () => {
  const token = localStorage.getItem("token")
  if (!token) {
    throw new Error("No token available")
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await api.get("/orders/userOrder", config)
  return response.data
})

const orderReducer = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orders = action.payload.data
        state.isLoading = false
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
      })
      .addCase(fetchOrder.pending, (state) => {
        state.error = null
        state.isLoading = true
      })
  }
})

export default orderReducer.reducer
