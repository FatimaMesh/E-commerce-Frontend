import { FaBahai, FaHome, FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom"

export const Nav = () => {
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
      <span>
        <FaShoppingBag />
        <Link to="#product" className="nav-link">
          Product
        </Link>
      </span>
    </nav>
  )
};
