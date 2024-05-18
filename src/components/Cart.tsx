import {
  FaAddressCard,
  FaApple,
  FaApplePay,
  FaBackward,
  FaOpencart,
  FaPlaceOfWorship,
  FaRegAddressBook,
  FaRegCreditCard,
  FaTrash
} from "react-icons/fa"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { fetchCart } from "@/services/slices/orderItemsSlice"
import { AppDispatch, RootState } from "@/services/store"
import "../style/customer.css"
import { BiCurrentLocation, BiLocationPlus, BiMoney, BiSolidLocationPlus } from "react-icons/bi"
import { Link } from "react-router-dom"

export const Cart = () => {
  const { orderItems, isLoading } = useSelector((state: RootState) => state.orderItemR)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchCartItem = async () => {
      await dispatch(fetchCart())
    }
    fetchCartItem()
  }, [])
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
            <td>Price</td>
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
                  <img src={item.product.image} alt="product image" />
                </td>
                <td>
                  <p>{item.product.name}</p>
                </td>
                <td>
                  <p>{item.price} SR</p>
                </td>
                <td>
                  <p>{item.quantity}</p>
                </td>
                <td className="cart-total">
                  <p>{item.price * item.quantity} SR</p>
                </td>
                <td>
                  <button className="delete-btn">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={6} className="no-content">Cart is empty</td></tr>
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
                  <Link to="" className="nav-link">
                    <FaBackward /> Back to shop
                  </Link>
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
