import { useState } from "react"

import { LoginForm } from "./LoginForm"
import { RegisterForm } from "./RegisterForm"
import "../style/login.css"
import lock from "../assets/image/lock.png"
import { Footer } from "./Footer"
import { Header } from "./Header"

export const Account = () => {
  const [registerActive, setRegisterActive] = useState<boolean>(false)
  const handlerButton = () => {
    setRegisterActive(!registerActive)
  }
  return (
    <>
      <Header />
      <section className="auth-container">
        <div className={registerActive ? "card card_reverse" : "card"}>
          <div className="card_image">
            <img src={lock} alt="" />
          </div>
          <div className="card_info">
            <h1 className="title">Welcome to Shine shop Haven</h1>
            <p>Your journey to find the perfect watch starts here.</p>
            <button className="btn" onClick={handlerButton}>
              {!registerActive ? "Register" : "Login"}
            </button>
          </div>
          <div className="card_input">
            <div className="bg">{registerActive ? <RegisterForm /> : <LoginForm />}</div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
