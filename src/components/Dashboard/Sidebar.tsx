import user from "../../assets/image/user.jpeg"
import { FaFirstOrder } from "react-icons/fa"
import { BiComment, BiLogOutCircle, BiSolidUserAccount } from "react-icons/bi"

const Sidebar = () => {
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
                <FaFirstOrder />
                Orders
              </li>
              <li>
                <BiComment />
                Reviews
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

export default Sidebar
