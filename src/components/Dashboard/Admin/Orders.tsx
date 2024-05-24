import dayjs from "dayjs"
import { ReactNode, useEffect, useState } from "react"
import { FaBoxOpen } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"

import { fetchAllOrder } from "@/services/slices/orderSlice"
import { AppDispatch, RootState } from "@/services/store"
import { Pagination } from "@/components/Pagination"
import Popup from "@/components/Popup"
import { DeleteOrder } from "../OrderAction"

export const Orders = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage] = useState<number>(4)
  const { orders, isLoading, error, totalOrders } = useSelector((state: RootState) => state.orderR)
  const dispatch: AppDispatch = useDispatch()

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
    const fetchOrders = async () => {
      await dispatch(fetchAllOrder({ currentPage, itemsPerPage }))
    }
    fetchOrders()
  }, [currentPage, itemsPerPage, totalOrders, dispatch])

  // Change page number
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <section className="order container">
      <h1>
        <FaBoxOpen /> Orders
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
                  <p>Owner: {item.user.fullName}</p>
                  <p>Email: {item.user.email} SR</p>
                  <p>Address: {item.deliveryAddress}</p>
                  <p>Total: {item.totalPrice} SR</p>
                  <p>Order Date: {dayjs(item.orderDate).format("DD MM YYYY")}</p>
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
                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleOpenPopup(<DeleteOrder id={item.orderId} onclose={handleClosePopup} />)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="no-content">
                <p>There is no orders Yet!</p>
              </td>
            </tr>
          )}
        </tbody>
        <tfoot className="pages-orders">
          <tr>
            <td colSpan={4}>
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={totalOrders}
                paginate={paginate}
              />
            </td>
          </tr>
        </tfoot>
      </table>
      {isPopupOpen && <Popup onClose={handleClosePopup}>{popupContent}</Popup>}
    </section>
  )
}
