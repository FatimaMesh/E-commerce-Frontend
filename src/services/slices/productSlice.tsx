import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import api from "@/api"
import { FilterType, FormProduct, ProductStates } from "@/types"
import { TokenConfig } from "../TokenConfig"

const initialState: ProductStates = {
  products: [],
  product: null,
  isLoading: false,
  totalItems: 0,
  reviews: [],
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
    category,
    minPrice,
    maxPrice
  }: FilterType) => {
    let url = `/products?page=${currentPage}&limit=${itemsPerPage}&sortBy=${sortBy}&orderBy=${orderBy}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    if (keyWord) {
      url += `&keyword=${keyWord}`
    }
    if (category) {
      url += `&category=${category}`
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

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData: FormProduct) => {
    const config = TokenConfig()
    const response = await api.post("/products", productData, config)
    return response.data
  }
)

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId: string | undefined) => {
    const config = TokenConfig()
    const response = await api.delete(`/products/${productId}`, config)
    return response.data
  }
)

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ productId, product }: { productId: string; product: FormProduct }) => {
    const config = TokenConfig()
    const response = await api.put(`/products/${productId}`, product, config)
    return response.data
  }
)

const productReducer = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.error = null
        state.isLoading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.data.products
        state.totalItems = action.payload.data.totalItems
        state.isLoading = false
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
      })

      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.product = action.payload.data
        state.reviews = action.payload.data.reviews
        state.isLoading = false
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
      })

      .addCase(addProduct.fulfilled, (state, action) => {
        state.products = [...state.products, action.payload.data]
        state.isLoading = false
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload.data
        state.products = state.products.map((product) =>
          product.productId === updatedProduct.productId ? updatedProduct : product
        )
        state.isLoading = false
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.productId !== action.payload.data
        )
        state.isLoading = false
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
      })
  }
})

export default productReducer.reducer
