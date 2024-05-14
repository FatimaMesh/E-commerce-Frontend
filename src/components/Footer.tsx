import { BiSend } from "react-icons/bi";
import { Link } from "react-scroll"

import logoIcon from "../assets/image/logoIcon.png"

export const Footer = () => {
  return (
    <footer>
      <section>
        <img src={logoIcon} alt="logo image" />
        <h3>Precision, Passion, Perfection: Your Dream Watch Awaits!</h3>
      </section>
      <section>
        <p>Quick Link</p>
        <div className="quick-link">
          <Link to="product" smooth={true} duration={500}  className="nav-link">
            Product
          </Link>
          <Link to="about" smooth={true} duration={500} className="nav-link">
            About us
          </Link>
          <Link to="category" smooth={true} duration={500} className="nav-link">
            Category
          </Link>
        </div>
      </section>
      <section>
        <h3>Subscribe</h3>
        <form>
          <input type="email" className="input" />
          <button className="btn">
            <BiSend></BiSend>Send
          </button>
        </form>
      </section>
    </footer>
  )
}
