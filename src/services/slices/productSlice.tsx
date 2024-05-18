import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import api from "@/api"
import { FilterType, ProductStates } from "@/types"

const initialState: ProductStates = {
  products: [],
  product: null,
  isLoading: false,
  review: [],
  error: null
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({
    currentPage,
    itemsPerPage,
    keyWord,
    orderBy,
    sortBy,
    minPrice,
    maxPrice
  }: FilterType) => {
    let url = `/products?page=${currentPage}&limit=${itemsPerPage}&sortBy=${sortBy}&orderBy=${orderBy}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    if (keyWord) {
      url += `&keyword=${keyWord}`
    }
    const response = await api.get(url)
    return response.data
  }
)

export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (slug: string | undefined) => {
    const response = await api.get(`/products/${slug}`)
    return response.data
  }
)

const productReducer = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.data.$values
        state.isLoading = false
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.product = action.payload.data
        state.review = action.payload.data.reviews.$values
        state.isLoading = false
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
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

export default productReducer.reducer
