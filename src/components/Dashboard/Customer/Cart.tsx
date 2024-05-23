import { FaOpencart, FaTrash } from "react-icons/fa"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { deleteFromCart, fetchCart, updateQuantity } from "@/services/slices/orderItemsSlice"
import { AppDispatch, RootState } from "@/services/store"
import { errorMessage, successMessage } from "@/utility/notify"
import { CreateOrder } from "./CreateOrder"

export const Cart = () => {
  const { orderItems, isLoading } = useSelector((state: RootState) => state.orderItemR)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchCartItem = async () => {
      await dispatch(fetchCart())
    }
    fetchCartItem()
  }, [dispatch])

  const increment = async (orderItemId: string, currentQuantity: number) => {
    await dispatch(updateQuantity({ orderItemId: orderItemId, quantity: currentQuantity + 1 }))
  }

  const decrement = async (orderItemId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      await dispatch(updateQuantity({ orderItemId: orderItemId, quantity: currentQuantity - 1 }))
    }
  }

  //add product to cart
  const handlerDeleteCartItem = async (orderItemId: string) => {
    try {
      const response = await dispatch(deleteFromCart(orderItemId)).unwrap()
      successMessage(response.message)
    } catch (error) {
      errorMessage((error as Error).message)
    }
  }
  return (
    <section className="cart-page">
      <div className="cart container">
        <h1>
          <FaOpencart /> Cart
        </h1>
        {isLoading && <p>Loading</p>}
        <table className="cart-card">
          <thead>
            <tr>
              <td colSpan={2}>Product</td>
              <td>Quantity</td>
              <td className="cart-total">Total</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {orderItems?.length ? (
              orderItems.map((item) => (
                <tr key={item.orderItemId}>
                  <td>
                    <img src={item.product.image} alt={item.product.description} />
                  </td>
                  <td>
                    <p>{item.product.name}</p>
                    <p>{item.price} SR</p>
                  </td>
                  <td>
                    <p className="update-quantity">
                      <button
                        type="button"
                        className="update-quantity_btn"
                        onClick={() => decrement(item.orderItemId, item.quantity)}
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        type="button"
                        className="update-quantity_btn"
                        onClick={() => increment(item.orderItemId, item.quantity)}
                      >
                        +
                      </button>
                    </p>
                  </td>
                  <td className="cart-total">
                    <p>{item.price * item.quantity} SR</p>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handlerDeleteCartItem(item.orderItemId)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="no-content">
                  Cart is empty
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={6}>
                <h3>Total items {orderItems.length}</h3>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <CreateOrder />
    </section>
  )
}
