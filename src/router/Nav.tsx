import { BiSolidDashboard } from "react-icons/bi"
import { FaBahai, FaHome, FaShoppingBag } from "react-icons/fa"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { RootState } from "@/services/store"

export const Nav = () => {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.userR)
  return (
    <nav className="header-navbar">
      <span>
        <FaHome />
        <Link to="/" className="nav-link">
          Home
        </Link>
      </span>
      <span>
        <FaBahai />
        <Link to="/about" className="nav-link">
          About
        </Link>
      </span>
      {!isLoggedIn ? (
        <span>
          {" "}
          <FaShoppingBag />
          <Link to="#product" className="nav-link">
            Product
          </Link>{" "}
        </span>
      ) : (
        <span>
          <BiSolidDashboard />
          <Link
            to={user?.role == 0 ? "/dashboard/customer" : "/dashboard/admin"}
            className="nav-link"
          >
            Dashboard
          </Link>
        </span>
      )}
    </nav>
  )
}
