import { configureStore } from "@reduxjs/toolkit"

import productReducer from "./slices/productSlice"
import userReducer from "./slices/userSlice"
import categoryReducer from "./slices/categorySlice"
import orderItemReducer from "./slices/orderItemsSlice"
import orderReducer from "./slices/orderSlice"
import reviewReducer from "./slices/reviewSlice"
export const store = configureStore({
  reducer: {
    productR: productReducer,
    userR: userReducer,
    categoryR: categoryReducer,
    orderItemR: orderItemReducer,
    orderR: orderReducer,
    reviewR: reviewReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
