import api from "@/api"
import { CategoryStates, FormCategory } from "@/types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { TokenConfig } from "../TokenConfig"

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

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (category: FormCategory) => {
    try {
      const config = TokenConfig()
      const response = await api.post("/categories", category, config)
      return response.data
    } catch (error: any) {
      throw error.response.data.Message
    }
  }
)

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ category, categoryId }: { category: FormCategory; categoryId: string | undefined }) => {
    try {
      const config = TokenConfig()
      const response = await api.put(`/categories/${categoryId}`, category, config)
      return response.data
    } catch (error: any) {
      throw error.response.data.Message
    }
  }
)

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId: string | undefined) => {
    try {
      const config = TokenConfig()
      const response = await api.delete(`/categories/${categoryId}`, config)
      return response.data
    } catch (error: any) {
      throw error.response.data.Message
    }
  }
)

const categoryReducer = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.error = null
        state.isLoading = true
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.data
        state.isLoading = false
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
      })

      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories = [...state.categories, action.payload.data]
        state.isLoading = false
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        const updatedCategory = action.payload.data
        state.categories = state.categories.map((category) =>
          category.categoryId === updatedCategory.categoryId ? updatedCategory : category
        )
        state.isLoading = false
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category.categoryId !== action.payload.data
        )
        state.isLoading = false
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
      })
  }
})

export default categoryReducer.reducer
