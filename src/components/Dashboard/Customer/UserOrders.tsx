import dayjs from "dayjs"
import { ReactNode, useEffect, useState } from "react"
import { FaFirstOrder } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"

import { usePage } from "@/context/PageContext"
import { fetchUserOrder } from "@/services/slices/orderSlice"
import { AppDispatch, RootState } from "@/services/store"
import Popup from "@/components/Popup"
import { CancelOrder } from "../OrderAction"

export const UserOrder = () => {
  const { userOrders, isLoading } = useSelector((state: RootState) => state.orderR)
  const dispatch: AppDispatch = useDispatch()
  const { setOpenPage } = usePage()

  //popup window for add/edit/delete product
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [popupContent, setPopupContent] = useState<ReactNode | null>(null)

  const handleOpenPopup = (content: ReactNode) => {
    setPopupContent(content)
    setIsPopupOpen(true)
  }

  const handleClosePopup = () => {
    setPopupContent(null)
    setIsPopupOpen(false)
  }

  useEffect(() => {
    const fetchUserOrders = async () => {
      await dispatch(fetchUserOrder())
    }
    fetchUserOrders()
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
        <tbody className="users-order">
          {userOrders?.length ? (
            userOrders.map((item) => (
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
                  {item.orderStatus !== 4 && (
                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleOpenPopup(
                          <CancelOrder id={item.orderId} onclose={handleClosePopup} />
                        )
                      }
                    >
                      Cancel
                    </button>
                  )}
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
            <td>
              <h3> Total orders {userOrders.length}</h3>
            </td>
          </tr>
        </tfoot>
      </table>
      {isPopupOpen && <Popup onClose={handleClosePopup}>{popupContent}</Popup>}
    </section>
  )
}
