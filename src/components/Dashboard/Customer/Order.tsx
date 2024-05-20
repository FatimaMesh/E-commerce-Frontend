import dayjs from "dayjs"
import { useEffect } from "react"
import { FaFirstOrder } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"

import { usePage } from "@/context/PageContext"
import { fetchOrder } from "@/services/slices/orderSlice"
import { AppDispatch, RootState } from "@/services/store"

export const Order = () => {
  const { orders, isLoading } = useSelector((state: RootState) => state.orderR)
  const dispatch: AppDispatch = useDispatch()
  const { setOpenPage } = usePage()

  useEffect(() => {
    const fetchCartItem = async () => {
      await dispatch(fetchOrder())
    }
    fetchCartItem()
  }, [])
  return (
    <section className="order container">
      <h1>
        <FaFirstOrder /> Order
      </h1>
      {isLoading && <p>Loading</p>}
      <table className="order-card">
        <thead>
          <tr>
            <td colSpan={2}>Order</td>
            <td>Status</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {orders?.length ? (
            orders.map((item) => (
              <tr key={item.orderId}>
                <td>
                  <p>Address: {item.deliveryAddress}</p>
                  <p>Total: {item.totalPrice} SR</p>
                  <p>Order Date: {dayjs(item.orderDate).format("DD MM YYYY")}</p>
                  <p>Delivery Date: {dayjs(item.deliveryDate).format("DD MM YYYY")}</p>
                </td>
                <td></td>
                <td>
                  {item.orderStatus === 0 && "Pending"}
                  {item.orderStatus === 1 && "Processing"}
                  {item.orderStatus === 2 && "OutForDelivery"}
                  {item.orderStatus === 3 && "Delivered"}
                  {item.orderStatus === 4 && "Canceled"}
                </td>
                <td>
                  <button className="delete-btn" disabled={item.orderStatus === 4}>
                    Cancel
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="no-content">
                <p>Order is empty</p>
                <button className="btn" onClick={() => setOpenPage("shop")}>
                  SHOP NOW
                </button>
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </section>
  )
}
