import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { loginUser } from "@/services/slices/userSlice"
import { AppDispatch } from "@/services/store"
import { errorMessage, successMessage } from "@/utility/notify"
import { FormLogin } from "@/types"

export const LoginForm = () => {
  const dispatch: AppDispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormLogin>()

  const navigate = useNavigate()

  //login user
  const loginSubmit: SubmitHandler<FormLogin> = async (data) => {
    try {
      const response = await dispatch(loginUser(data))
      successMessage(response.payload.message)
      reset()
      const userLoggedIn = response.payload.data.userSignIn
      navigate(userLoggedIn.role === 1 ? "/dashboard/admin" : "/dashboard/customer")
    } catch (error) {
      errorMessage("Error occurred while signIn user")
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit(loginSubmit)}>
      <p className="form_title title">Login</p>
      <div className="field">
        <input
          placeholder="Email"
          className="input"
          type="email"
          {...register("email", {
            required: "Email Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
        />
        {errors.email && <p className="error">{errors.email?.message}</p>}
      </div>
      <div className="field">
        <input
          placeholder="Password"
          className="input"
          type="password"
          {...register("password", {
            required: "Password Required"
          })}
        />
        {errors.password && <p className="error">{errors.password?.message}</p>}
      </div>
      <div className="btn_container">
        <button className="btn_login btn" type="submit">
          Login
        </button>
        <button className="btn_forgot">Forgot Password</button>
      </div>
    </form>
  )
}
