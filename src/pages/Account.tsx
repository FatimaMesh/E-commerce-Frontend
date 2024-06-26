import { useState } from "react"

import "@/style/account.css"
import lock from "../assets/image/lock.png"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { LoginForm } from "../components/LoginForm"
import { RegisterForm } from "../components/RegisterForm"

export const Account = () => {
  const [registerActive, setRegisterActive] = useState<boolean>(false)
  const handlerButton = () => {
    setRegisterActive(!registerActive)
  }
  return (
    <>
      <Header />
      <main className="main-container">
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
      </main>
      <Footer />
    </>
  )
}
