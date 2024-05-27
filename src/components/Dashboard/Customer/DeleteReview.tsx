import { useDispatch } from "react-redux"

import { deleteReview } from "@/services/slices/reviewSlice"
import { AppDispatch } from "@/services/store"
import { errorMessage, successMessage } from "@/utility/notify"

//Delete review
export const DeleteReview = ({ id, onclose }: { id: string; onclose: () => void }) => {
  const dispatch: AppDispatch = useDispatch()

  const handleDelete = async (id: string) => {
    try {
      const response = await dispatch(deleteReview(id)).unwrap()
      successMessage(response.message)
      onclose()
    } catch (error) {
      errorMessage((error as Error).message)
    }
  }

  return (
    <section className="popup-window">
      <h1>Delete Review</h1>
      <p>Are you sure..!</p>
      <button className="btn confirm" type="submit" onClick={() => handleDelete(id)}>
        Confirm
      </button>
    </section>
  )
}
