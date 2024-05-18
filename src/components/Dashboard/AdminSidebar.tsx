import user from "../../assets/image/user.jpeg"
import { FaBoxOpen, FaUsers } from "react-icons/fa"
import {
  BiCategory,
  BiLogOutCircle,
  BiSolidDashboard,
  BiSolidUserAccount,
  BiSolidWatch
} from "react-icons/bi"

const AdminSidebar = () => {
  return (
    <aside className="dashboard-sidebar">
      {/* <!-- SIDEBAR HEADER --> */}
      <section className="user-head">
        <img src={user} alt="Logo" />
        <div>
          <h2>fatimah ahmed</h2>
          <p>fat@hotmail.com</p>
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
              <li>
                <BiSolidDashboard />
                Dashboard
              </li>
              <li>
                <FaUsers />
                Users
              </li>
              <li>
                <BiSolidWatch />
                Products
              </li>
              <li>
                <BiCategory />
                Category
              </li>
              <li>
                <FaBoxOpen />
                Orders
              </li>
              <li>
                <BiSolidUserAccount />
                Account Details
              </li>
              <li>
                <BiLogOutCircle />
                Logout
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
