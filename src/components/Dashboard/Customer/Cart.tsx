import { FaApple, FaBackward, FaOpencart, FaRegCreditCard, FaTrash } from "react-icons/fa"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BiMoney } from "react-icons/bi"

import { deleteFromCart, fetchCart } from "@/services/slices/orderItemsSlice"
import { AppDispatch, RootState } from "@/services/store"
import { usePage } from "@/context/PageContext"
import { errorMessage, successMessage } from "@/utility/notify"

export const Cart = () => {
  const { orderItems, isLoading } = useSelector((state: RootState) => state.orderItemR)
  const dispatch: AppDispatch = useDispatch()
  const { setOpenPage } = usePage()

  useEffect(() => {
    const fetchCartItem = async () => {
      await dispatch(fetchCart())
    }
    fetchCartItem()
  }, [dispatch])

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
    <section className="cart container">
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
                  <p>{item.quantity}</p>
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
              <form className="checkout">
                <address className="address-info">
                  <label htmlFor="address">Delivery Address</label>
                  <textarea placeholder="Address" className="input" />
                </address>
                <section className="payment-info">
                  <label htmlFor="payment">Payment</label>
                  <div className="payment-method">
                    <div>
                      <input type="radio" name="payment" />{" "}
                      <label>
                        <BiMoney /> Cash
                      </label>
                    </div>
                    <div>
                      <input type="radio" name="payment" />{" "}
                      <label>
                        <FaRegCreditCard /> Credit Card
                      </label>
                    </div>
                    <div>
                      <input type="radio" name="payment" />{" "}
                      <label>
                        <FaApple /> ApplyPay
                      </label>
                    </div>
                  </div>
                </section>
                <section className="confirm-order">
                  <p className="nav-link" onClick={() => setOpenPage("shop")}>
                    <FaBackward /> Back to shop
                  </p>
                  <button type="submit" className="btn">
                    Checkout
                  </button>
                </section>
              </form>
            </td>
          </tr>
        </tfoot>
      </table>
    </section>
  )
}
