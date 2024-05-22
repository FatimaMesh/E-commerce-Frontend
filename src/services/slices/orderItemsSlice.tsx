import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import api from "@/api"
import { OrderItem, cartData } from "@/types"
import { TokenConfig } from "../TokenConfig"

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
  const config = TokenConfig()
  const response = await api.get("/orderItems/cart", config)
  return response.data
})

export const addToCart = createAsyncThunk("orderItems/addToCart", async (cartItem: cartData) => {
  const config = TokenConfig()
  const response = await api.post("/orderItems", cartItem, config)
  return response.data
})

export const deleteFromCart = createAsyncThunk(
  "orderItems/deleteFromCart",
  async (orderItemId: string | undefined) => {
    const config = TokenConfig()
    const response = await api.delete(`/orderItems/${orderItemId}`, config)
    return response.data
  }
)

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

      .addCase(addToCart.fulfilled, (state, action) => {
        //API return new list after added
        state.orderItems = action.payload.data
        state.isLoading = false
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
      })

      .addCase(deleteFromCart.fulfilled, (state, action) => {
        state.orderItems = state.orderItems.filter(
          (orderItem) => orderItem.orderItemId !== action.payload.data
        )
        state.isLoading = false
      })
      .addCase(deleteFromCart.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
      })
  }
})

export default orderItemReducer.reducer
