import { Link } from "react-router-dom"


import logo from "../../assets/image/logo.png"
import { BiLogOut, BiSearch } from "react-icons/bi"
import { FaShoppingCart } from "react-icons/fa"

const Header = () => {
  return (
    <header className="dashboard-header">
      <div className="section-1">
        <Link className="header-logo" to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="section-2">
        <form action="" method="POST">
          <div className="search-container">
            <button className="search-btn btn">
              <BiSearch />
            </button>
            <input type="text" placeholder="Type to search..." className="search-input input" />
          </div>
        </form>
      </div>

      <div className="section-3">
        <Link to="" className="btn">
          Cart <FaShoppingCart />
        </Link>
        <Link to="" className="btn">
          Logout <BiLogOut/>
        </Link>
      </div>
    </header>
  )
}

export default Header

{
  /* <button className="btn">
          <BiMenu />
        </button> */
}
