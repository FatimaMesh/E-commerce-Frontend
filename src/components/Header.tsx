import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import logo from "@/assets/image/logo.png"
import { Nav } from "@/router/Nav"
import { AppDispatch, RootState } from "@/services/store"
import { logout } from "@/services/slices/userSlice"

export const Header = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.userR)
  const dispatch: AppDispatch = useDispatch()

  return (
    <header>
      <Link className="header-logo" to="/">
        <img src={logo} alt="Logo Icon" />
      </Link>
      <Nav></Nav>
      <div className="header-btn">
        {!isLoggedIn ? (
          <Link to="/login" className="btn">
            <FaSignInAlt />
            Login
          </Link>
        ) : (
          <Link to="/" className="btn" onClick={() => dispatch(logout())}>
            Logout <FaSignOutAlt />
          </Link>
        )}
      </div>
    </header>
  )
}
