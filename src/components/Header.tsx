import { FaSignInAlt } from "react-icons/fa";

import logo from "../assets/image/logo.png"
import { Nav } from "../router/Nav";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <div className="header-logo">
        <img src={logo} alt="Logo Icon" className="header-logo" />
      </div>
      <Nav></Nav>
      <div className="btn-container">
        <Link to="/login" className="btn login-btn">
          <FaSignInAlt />
          Login
        </Link>
      </div>
    </header>
  );
};
