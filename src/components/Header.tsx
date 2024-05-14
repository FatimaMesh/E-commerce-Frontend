import { FaSignInAlt } from "react-icons/fa";

import logo from "../assets/image/logo.png"
import { Nav } from "../router/Nav";

export const Header = () => {
  return (
    <header>
      <div className="header-logo">
        <img src={logo} alt="Logo Icon" className="header-logo" />
      </div>
      <Nav></Nav>
      <div className="btn-container">
        <button className="btn login-btn">
          {" "}
          <FaSignInAlt />
          Login
        </button>
      </div>
    </header>
  );
};
