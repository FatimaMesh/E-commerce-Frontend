import { BiSend, BiSolidContact } from "react-icons/bi"
import { Link } from "react-router-dom"

import logoIcon from "../assets/image/logoIcon.png"
import {
  FaEnvelope,
  FaExclamationCircle,
  FaFacebook,
  FaInstagram,
  FaMobile,
  FaPhone,
  FaTwitter
} from "react-icons/fa"

export const Footer = () => {
  return (
    <footer>
      <section className="footer-logo">
        <img src={logoIcon} alt="logo image" />
        <p>Precision, Passion, Perfection: Your Dream Watch Awaits!</p>
      </section>
      <form className="footer-subscribe">
        <label htmlFor="subscribe-email">Subscribe</label>
        <input type="email" className="input" name="subscribe-email" id="subscribe-email" />
        <button className="btn">
          <BiSend />
          Send
        </button>
      </form>
      <section className="footer-contact">
        <h2>Contact Us</h2>
        <div className="contact-link">
          <a href="" className="nav-link">
            <FaFacebook />
          </a>
          <a href="mailto:contact@shineshop.com" className="nav-link">
            <FaEnvelope />
          </a>
          <a className="nav-link">
            <FaPhone />
          </a>
        </div>
      </section>
      <p className="footer-copy">&copy; 2024 Shine Shop. All rights reserved.</p>
    </footer>
  )
}
