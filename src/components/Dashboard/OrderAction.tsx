import { useDispatch } from "react-redux"

import { cancelOrder, deleteOrder } from "@/services/slices/orderSlice"
import { AppDispatch } from "@/services/store"
import { errorMessage, successMessage } from "@/utility/notify"

//Delete Order
export const DeleteOrder = ({ id, onclose }: { id: string; onclose: () => void }) => {
  const dispatch: AppDispatch = useDispatch()

  const handleDelete = async (id: string) => {
    try {
      const response = await dispatch(deleteOrder(id)).unwrap()
      successMessage(response.message)
      onclose()
    } catch (error) {
      errorMessage((error as Error).message)
    }
  }

  return (
    <section className="popup-window">
      <h1>Delete Order</h1>
      <p>Are you sure..!</p>
      <button className="btn confirm" type="submit" onClick={() => handleDelete(id)}>
        Confirm
      </button>
    </section>
  )
}

//cancel Order
export const CancelOrder = ({ id, onclose }: { id: string; onclose: () => void }) => {
  const dispatch: AppDispatch = useDispatch()

  const handleCancel = async (id: string) => {
    try {
      const response = await dispatch(cancelOrder(id)).unwrap()
      successMessage(response.message)
      onclose()
    } catch (error) {
      errorMessage((error as Error).message)
    }
  }

  return (
    <section className="popup-window">
      <h1>Cancel Order</h1>
      <p>Are you sure..!</p>
      <button className="btn confirm" type="submit" onClick={() => handleCancel(id)}>
        Confirm
      </button>
    </section>
  )
}
