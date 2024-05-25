import { MouseEvent, useEffect, useState } from "react"
import { BiCart, BiCommentDetail, BiSend } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import dayjs from "dayjs"

import { AppDispatch, RootState } from "@/services/store"
import { fetchSingleProduct } from "@/services/slices/productSlice"
import { addToCart, addToLocalCart } from "@/services/slices/orderItemsSlice"
import { addReview } from "@/services/slices/reviewSlice"
import { errorMessage, successMessage } from "@/utility/notify"
import { Product, ReviewForm } from "@/types"
import { SubmitHandler, useForm } from "react-hook-form"

export const Review = ({ productId }: { productId: string | undefined }) => {
  const dispatch: AppDispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ReviewForm>()

  // Add comment
  const commentSubmit: SubmitHandler<ReviewForm> = async (data) => {
    try {
      console.log(data + " " + productId)
      const response = await dispatch(
        addReview({ productId: productId, comment: data.comment })
      ).unwrap()
      successMessage(response.message)
      reset()
    } catch (error) {
      errorMessage((error as Error).message)
    }
  }

  return (
    <>
      <form className="review-form" onSubmit={handleSubmit(commentSubmit)}>
        <textarea
          placeholder="Write your comment"
          {...register("comment", {
            required: "Comment Required",
            minLength: { value: 10, message: "Should be more than 10 characters" }
          })}
        />
        {errors.comment && <p className="error">{errors.comment?.message}</p>}
        <button className="btn" type="submit">
          <BiSend /> Send comment
        </button>
      </form>
    </>
  )
}
