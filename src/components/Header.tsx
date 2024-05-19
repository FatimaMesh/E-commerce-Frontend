import { FaSignInAlt } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { BiLogOut } from "react-icons/bi"

import logo from "../assets/image/logo.png"
import { Nav } from "../router/Nav"
import { AppDispatch, RootState } from "@/services/store"
import { logout } from "@/services/slices/userSlice"

export const Header = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.userR)
  const dispatch: AppDispatch = useDispatch()

  return (
    <header>
      <div className="header-logo">
        <Link className="header-logo" to="/">
          <img src={logo} alt="Logo Icon" className="header-logo" />
        </Link>
      </div>
      <Nav></Nav>
      <div className="btn-container">
        {!isLoggedIn ? (
          <Link to="/login" className="btn login-btn">
            <FaSignInAlt />
            Login
          </Link>
        ) : (
          <Link to="/" className="btn" onClick={() => dispatch(logout())}>
            Logout <BiLogOut />
          </Link>
        )}
      </div>
    </header>
  )
}
