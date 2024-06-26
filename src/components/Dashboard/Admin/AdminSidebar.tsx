import { useSelector } from "react-redux"
import { FaBoxOpen, FaUsers } from "react-icons/fa"
import { BiCategory, BiSolidDashboard, BiSolidUserAccount, BiSolidWatch } from "react-icons/bi"

import userIcon from "../../../assets/image/user.jpeg"
import { usePage } from "@/context/PageContext"
import { RootState } from "@/services/store"

const AdminSidebar = () => {
  const { openPage, setOpenPage } = usePage()
  const { user } = useSelector((state: RootState) => state.userR)

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
                onClick={() => setOpenPage("dashboard")}
                className={openPage === "dashboard" ? "open-sidebar" : ""}
              >
                <BiSolidDashboard />
                Dashboard
              </li>
              <li
                onClick={() => setOpenPage("users")}
                className={openPage === "users" ? "open-sidebar" : ""}
              >
                <FaUsers />
                Users
              </li>
              <li
                onClick={() => setOpenPage("products")}
                className={openPage === "products" ? "open-sidebar" : ""}
              >
                <BiSolidWatch />
                Products
              </li>
              <li
                onClick={() => setOpenPage("category")}
                className={openPage === "category" ? "open-sidebar" : ""}
              >
                <BiCategory />
                Category
              </li>
              <li
                onClick={() => setOpenPage("orders")}
                className={openPage === "orders" ? "open-sidebar" : ""}
              >
                <FaBoxOpen />
                Orders
              </li>
              <li
                onClick={() => setOpenPage("account")}
                className={openPage === "account" ? "open-sidebar" : ""}
              >
                <BiSolidUserAccount />
                Account
              </li>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </section>
    </aside>
  )
}

export default AdminSidebar
