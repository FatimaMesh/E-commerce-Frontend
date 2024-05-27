import { BiSend } from "react-icons/bi"
import { useDispatch } from "react-redux"
import { SubmitHandler, useForm } from "react-hook-form"

import { AppDispatch } from "@/services/store"
import { addReview } from "@/services/slices/reviewSlice"
import { errorMessage, successMessage } from "@/utility/notify"
import { ReviewForm } from "@/types"

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
