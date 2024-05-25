import api from "@/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { TokenConfig } from "../TokenConfig"
import { ReviewStates } from "@/types"

const initialState: ReviewStates = {
  reviews: [],
  review: null,
  isLoading: false,
  error: null
}

export const fetchReview = createAsyncThunk("reviews/fetchReview", async () => {
  const response = await api.get("/reviews")
  return response.data
})

export const addReview = createAsyncThunk(
  "reviews/addReview",
  async ({ comment, productId }: { comment: string; productId: string | undefined }) => {
    const config = TokenConfig()
    const response = await api.post("/reviews", { productId, comment }, config)
    return response.data
  }
)

const categoryReducer = createSlice({
  name: "Reviews",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReview.pending, (state) => {
        state.error = null
        state.isLoading = true
      })
      .addCase(fetchReview.fulfilled, (state, action) => {
        state.reviews = action.payload.data
        state.isLoading = false
      })
      .addCase(fetchReview.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
      })

      .addCase(addReview.fulfilled, (state, action) => {
        state.reviews = [...state.reviews, action.payload.data]
        state.isLoading = false
      })
      .addCase(addReview.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
      })
  }
})

export default categoryReducer.reducer
