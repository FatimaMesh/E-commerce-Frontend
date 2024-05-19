import api from "@/api"
import { CategoryStates } from "@/types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState: CategoryStates = {
  categories: [],
  category: null,
  isLoading: false,
  error: null
}

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
  const response = await api.get("/categories")
  return response.data
})

const categoryReducer = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.data
        state.isLoading = false
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
      })
      .addCase(fetchCategories.pending, (state) => {
        state.error = null
        state.isLoading = true
      })
  }
})

export default categoryReducer.reducer
