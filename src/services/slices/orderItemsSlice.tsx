import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import api from "@/api"
import { OrderItem, Product, cartData } from "@/types"
import { TokenConfig } from "../TokenConfig"

export type localCartItems = {
  product: Product
  quantity: number
}
export type orderItemsStates = {
  orderItems: OrderItem[]
  orderItem: OrderItem | null
  isLoading: boolean
  error: string | null
  localCart: localCartItems[]
}
const initialState: orderItemsStates = {
  orderItems: [],
  orderItem: null,
  isLoading: false,
  error: null,
  localCart: []
}

export const fetchCart = createAsyncThunk("orderItems/fetchCart", async () => {
  const localCartString = localStorage.getItem("cart")
  const dataMap = localCartString ? JSON.parse(localCartString) : []
  const config = TokenConfig()

  //check if there is item on cart added them to database
  if (dataMap.length > 0) {
    const data = dataMap.map((item: localCartItems) => {
      return {
        productId: item.product.productId,
        quantity: item.quantity
      }
    })

    for (const element of data) {
      try {
        await api.post("/orderItems", element, config)
      } catch (error) {
        console.error("Error on add cart item:", error)
      }
    }
    localStorage.removeItem("cart")
  }
  const response = await api.get("/orderItems/cart", config)
  return response.data
})

export const addToCart = createAsyncThunk("orderItems/addToCart", async (cartItem: cartData) => {
  const config = TokenConfig()
  const response = await api.post("/orderItems", cartItem, config)
  return response.data
})

export const updateQuantity = createAsyncThunk(
  "orderItems/updateQuantity",
  async ({ orderItemId, quantity }: { orderItemId: string; quantity: number }) => {
    const config = TokenConfig()
    const response = await api.put(`/orderItems/${orderItemId}`, { quantity }, config)
    return response.data
  }
)

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
  reducers: {
    orderConfirm(state) {
      state.orderItems = []
    },
    getLocalCart(state) {
      const currentCartString = localStorage.getItem("cart")
      state.localCart = currentCartString ? JSON.parse(currentCartString) : []
    },
    addToLocalCart(state, action) {
      const index = state.localCart.findIndex(
        (item) => item.product.productId === action.payload.product.productId
      )
      if (index !== -1) {
        // if product already, update its quantity
        const updatedCart = [...state.localCart]
        updatedCart[index].quantity += action.payload.quantity
        localStorage.setItem("cart", JSON.stringify(updatedCart))
        state.localCart = updatedCart
      } else {
        const updatedCart = [...state.localCart, action.payload]
        localStorage.setItem("cart", JSON.stringify(updatedCart))
        state.localCart = updatedCart
      }
    },
    updateLocalCart(state, action) {
      const index = state.localCart.findIndex(
        (item) => item.product.productId === action.payload.productId
      )
      if (index !== -1) {
        state.localCart[index].quantity = action.payload.currentQuantity
      }
      localStorage.setItem("cart", JSON.stringify(state.localCart))
    },
    deleteFromLocalCart(state, action) {
      const updatedCart = state.localCart.filter(
        (item) => item.product.productId !== action.payload
      )
      state.localCart = updatedCart
      localStorage.setItem("cart", JSON.stringify(updatedCart))
    }
  },
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

      .addCase(updateQuantity.fulfilled, (state, action) => {
        const index = state.orderItems.findIndex(
          (item) => item.orderItemId === action.payload.data.orderItemId
        )
        if (index !== -1) {
          state.orderItems[index].quantity = action.payload.data.quantity
        }
        state.isLoading = false
      })

      .addCase(updateQuantity.rejected, (state, action) => {
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

export const { orderConfirm, addToLocalCart, getLocalCart, deleteFromLocalCart, updateLocalCart } =
  orderItemReducer.actions

export default orderItemReducer.reducer
