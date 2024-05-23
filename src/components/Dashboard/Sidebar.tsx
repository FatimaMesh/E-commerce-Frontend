import { FaFirstOrder, FaShoppingCart } from "react-icons/fa"
import { BiComment, BiSolidUserAccount, BiSolidWatch } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"

import userIcon from "../../assets/image/user.jpeg"
import { usePage } from "@/context/PageContext"
import { AppDispatch, RootState } from "@/services/store"
import { useEffect } from "react"
import { fetchCart } from "@/services/slices/orderItemsSlice"

const Sidebar = () => {
  const dispatch: AppDispatch = useDispatch()
  const { openPage, setOpenPage } = usePage()
  const { user } = useSelector((state: RootState) => state.userR)
  const { orderItems } = useSelector((state: RootState) => state.orderItemR)

  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch])

  return (
    <aside className="dashboard-sidebar">
      {/* <!-- SIDEBAR HEADER --> */}
      <section className="user-head" onClick={() => setOpenPage("account")}>
        <img src={userIcon} alt="Logo" />
        <div>
          <h2>{user?.fullName}</h2>
          <p>{user?.email}</p>
        </div>
      </section>

      {/* <!-- Sidebar Menu --> */}
      <section className="sidebar-menu">
        <nav className="menu-group">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="menu-title">Services</h3>
            {/* <!-- Menu Item Dashboard --> */}
            <ul className="menu-list">
              <li
                onClick={() => setOpenPage("shop")}
                className={openPage === "shop" ? "open-sidebar" : ""}
              >
                <BiSolidWatch />
                Shop
              </li>
              <li
                onClick={() => setOpenPage("order")}
                className={openPage === "order" ? "open-sidebar" : ""}
              >
                <FaFirstOrder />
                Orders
              </li>
              <li
                onClick={() => setOpenPage("review")}
                className={openPage === "review" ? "open-sidebar" : ""}
              >
                <BiComment />
                Reviews
              </li>
              <li
                onClick={() => setOpenPage("account")}
                className={openPage === "account" ? "open-sidebar" : ""}
              >
                <BiSolidUserAccount />
                Account
              </li>
              <li
                onClick={() => setOpenPage("cart")}
                className={openPage === "cart" ? "open-sidebar cart-icon" : "cart-icon"}
              >
                <FaShoppingCart />
                Cart
                <span className="badge">{orderItems.length}</span>
              </li>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </section>
    </aside>
  )
}

export default Sidebar
