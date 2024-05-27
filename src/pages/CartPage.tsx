import { useEffect } from "react"
import { FaOpencart, FaTrash } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import "../style/cart.css"
import cartImage from "../assets/image/cartImage.png"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import {
  deleteFromLocalCart,
  getLocalCart,
  updateLocalCart
} from "@/services/slices/orderItemsSlice"
import { AppDispatch, RootState } from "@/services/store"
import { successMessage } from "@/utility/notify"

export const CartPage = () => {
  //for local storage view
  const { isLoggedIn } = useSelector((state: RootState) => state.userR)
  const { localCart } = useSelector((state: RootState) => state.orderItemR)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(getLocalCart())
  }, [dispatch])

  const increment = (productId: string, currentQuantity: number) => {
    currentQuantity += 1
    dispatch(updateLocalCart({ productId, currentQuantity }))
  }

  const decrement = (productId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      currentQuantity -= 1
      dispatch(updateLocalCart({ productId, currentQuantity }))
    }
  }

  const handlerDeleteCartItem = (productId: string) => {
    dispatch(deleteFromLocalCart(productId))
    successMessage("Deleted item successfully")
  }

  return (
    <>
      <Header />
      <main className="main-container">
        <h1 className="cart-title">
          <FaOpencart /> Shopping Cart
        </h1>
        <section className="cart-page">
          <div className="cart container">
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
                {/* local storage view  */}
                {!isLoggedIn && localCart.length ? (
                  localCart.map((item) => (
                    <tr key={item.product.productId}>
                      <td>
                        <img src={item.product.image} alt={item.product.description} />
                      </td>
                      <td>
                        <p>{item.product.name}</p>
                        <p>{item.product.price} SR</p>
                      </td>
                      <td>
                        <p className="update-quantity">
                          <button
                            type="button"
                            className="update-quantity_btn"
                            onClick={() => decrement(item.product.productId, item.quantity)}
                          >
                            -
                          </button>
                          {item.quantity}
                          <button
                            type="button"
                            className="update-quantity_btn"
                            onClick={() => increment(item.product.productId, item.quantity)}
                          >
                            +
                          </button>
                        </p>
                      </td>
                      <td className="cart-total">
                        <p>{item.product.price * item.quantity} SR</p>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => handlerDeleteCartItem(item.product.productId)}
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
                {/* end local storage  */}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={6}>
                    <h3>Total items {localCart.length}</h3>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
        <div className="cart-bottom">
          <img src={cartImage} alt="cart Image" />
          <Link to="/login" className="nav-link">
            Login to order these items
          </Link>
          <Link to="/" className="nav-link">
            <h2>back to shop</h2>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
