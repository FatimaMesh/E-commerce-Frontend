import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import api from "@/api"
import { TokenConfig } from "../TokenConfig"
import { ReviewStates } from "@/types"

const initialState: ReviewStates = {
  reviews: [],
  userReviews: [],
  review: null,
  isLoading: false,
  error: null
}

export const fetchReview = createAsyncThunk("reviews/fetchReview", async () => {
  const response = await api.get("/reviews")
  return response.data
})

export const fetchUserReview = createAsyncThunk("reviews/fetchUserReview", async () => {
  const config = TokenConfig()
  const response = await api.get("/reviews/userReviews", config)
  return response.data
})

export const addReview = createAsyncThunk(
  "reviews/addReview",
  async ({ comment, productId }: { comment: string; productId: string | undefined }) => {
    try {
      const config = TokenConfig()
      const response = await api.post("/reviews", { productId, comment }, config)
      return response.data
    } catch (error: any) {
      throw error.response.data.Message
    }
  }
)

export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (reviewId: string | undefined) => {
    try {
      const config = TokenConfig()
      const response = await api.delete(`/reviews/${reviewId}`, config)
      return response.data
    } catch (error: any) {
      throw error.response.data.Message
    }
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

      .addCase(fetchUserReview.pending, (state) => {
        state.error = null
        state.isLoading = true
      })
      .addCase(fetchUserReview.fulfilled, (state, action) => {
        state.userReviews = action.payload.data
        state.isLoading = false
      })
      .addCase(fetchUserReview.rejected, (state, action) => {
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

      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter((r) => r.reviewId !== action.payload.data)
        state.userReviews = state.userReviews.filter((r) => r.reviewId !== action.payload.data)
        state.isLoading = false
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.error = action.error.message || "There is something wrong"
        state.isLoading = false
      })
  }
})

export default categoryReducer.reducer
