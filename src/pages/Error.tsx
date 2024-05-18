import { Link } from "react-router-dom"
import { FaBackward } from "react-icons/fa"

import errorWatch from "../assets/image/error.png"
import "../style/error.css"

export const Error = () => {
  return (
    <section className="error-container">
      <h1>Page not found</h1>
      <div className="error-type">
        <h1>4</h1>
        <img src={errorWatch} alt="" />
        <h1>4</h1>
      </div>
      <Link to="/" className="btn">
        <FaBackward /> Back to home page
      </Link>
    </section>
  )
}
