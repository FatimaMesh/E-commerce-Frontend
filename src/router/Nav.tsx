import { BiSolidDashboard, BiSolidWatch } from "react-icons/bi"
import { FaBahai, FaHome } from "react-icons/fa"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { ShoppingCartIcon } from "lucide-react"
import { Link as ScrollLink } from "react-scroll"

import { RootState } from "@/services/store"
import "../style/cart.css"

export const Nav = () => {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.userR)
  const { localCart } = useSelector((state: RootState) => state.orderItemR)
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
        <>
          <span>
            {" "}
            <BiSolidWatch />
            <ScrollLink to="product" className="nav-link">
              Product
            </ScrollLink>{" "}
          </span>
          <span className="home-cart">
            <Link to="/cart" className="nav-link">
              <ShoppingCartIcon />
            </Link>{" "}
            <p className="badge">{localCart.length}</p>
          </span>
        </>
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
