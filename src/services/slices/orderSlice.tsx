import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import api from "@/api"
import { TokenConfig } from "../TokenConfig"
import { FormOrder, orderStates } from "@/types"

const initialState: orderStates = {
  orders: [],
  userOrders: [],
  order: null,
  totalOrders: 0,
  totalUserOrders: 0,
  isLoading: false,
  error: null
}

export const fetchUserOrder = createAsyncThunk(
  "order/fetchUserOrder",
  async ({ currentPage, itemsPerPage }: { currentPage: number; itemsPerPage: number }) => {
    const config = TokenConfig()
    const response = await api.get(
      `/orders/userOrder?page=${currentPage}&limit=${itemsPerPage}`,
      config
    )
    return response.data
  }
)

export const fetchAllOrder = createAsyncThunk(
  "order/fetchAllOrder",
  async ({ currentPage, itemsPerPage }: { currentPage: number; itemsPerPage: number }) => {
    const config = TokenConfig()
    const response = await api.get(`/orders?page=${currentPage}&limit=${itemsPerPage}`, config)
    return response.data
  }
)

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (orderId: string | undefined) => {
    const config = TokenConfig()
    const response = await api.delete(`/orders/${orderId}`, config)
    return response.data
  }
)

//only update method/address
export const addOrder = createAsyncThunk("order/addOrder", async (order: FormOrder) => {
  const config = TokenConfig()
  const response = await api.post("/orders", order, config)
  return response.data
})

//only update method/address
export const updatedOrder = createAsyncThunk(
  "order/updatedOrder",
  async ({ order, orderId }: { order: FormOrder; orderId: string | undefined }) => {
    const config = TokenConfig()
    const response = await api.put(`/orders/${orderId}`, order, config)
    return response.data
  }
)

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (orderId: string | undefined) => {
    const config = TokenConfig()
    const response = await api.put(`/orders/${orderId}/cancel`, {}, config)
    return response.data
  }
)

const orderReducer = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserOrder.pending, (state) => {
        state.error = null
        state.isLoading = true
      })
      .addCase(fetchUserOrder.fulfilled, (state, action) => {
        state.userOrders = action.payload.data.usersOrders
        state.totalUserOrders = action.payload.data.totalUserOrder
        state.isLoading = false
      })
      .addCase(fetchUserOrder.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
      })

      .addCase(fetchAllOrder.pending, (state) => {
        state.error = null
        state.isLoading = true
      })
      .addCase(fetchAllOrder.fulfilled, (state, action) => {
        state.orders = action.payload.data.orders
        state.totalOrders = action.payload.data.totalOrder
        state.isLoading = false
      })
      .addCase(fetchAllOrder.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
      })

      .addCase(addOrder.fulfilled, (state, action) => {
        state.userOrders = [...state.userOrders, action.payload.data]
        state.orders = [...state.orders, action.payload.data]
        state.isLoading = false
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
      })

      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((order) => order.orderId !== action.payload.data)
        state.userOrders = state.userOrders.filter((order) => order.orderId !== action.payload.data)
        state.isLoading = false
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
      })

      .addCase(cancelOrder.fulfilled, (state, action) => {
        const updatedOrder = action.payload.data
        state.orders = state.orders.map((order) =>
          order.orderId === updatedOrder.orderId
            ? { ...order, orderStatus: updatedOrder.orderStatus }
            : order
        )
        state.userOrders = state.userOrders.map((order) =>
          order.orderId === updatedOrder.orderId
            ? { ...order, orderStatus: updatedOrder.orderStatus }
            : order
        )
        state.isLoading = false
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
      })
  }
})

export default orderReducer.reducer
