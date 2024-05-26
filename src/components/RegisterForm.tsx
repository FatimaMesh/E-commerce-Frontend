import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

import { registerUser } from "@/services/slices/userSlice"
import { AppDispatch } from "@/services/store"
import { errorMessage, successMessage } from "@/utility/notify"
import { FormRegister } from "@/types"

export const RegisterForm = () => {
  const dispatch: AppDispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormRegister>()

  //register user
  const registerSubmit: SubmitHandler<FormRegister> = async (data) => {
    try {
      const response = await dispatch(registerUser(data)).unwrap()
      successMessage(response.message + " Login NOW")
      reset()
    } catch (error: any) {
      errorMessage(error.message)
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit(registerSubmit)}>
      <p className="form_title title">Register</p>
      <div className="field">
        <input
          placeholder="Full name"
          className="input"
          type="text"
          {...register("fullName", {
            required: "FullName Required",
            minLength: { value: 3, message: "Should be more than 3 characters" }
          })}
        />
        {errors.fullName && <p className="error">{errors.fullName?.message}</p>}
      </div>
      <div className="field">
        <input
          placeholder="Password"
          className="input"
          type="password"
          {...register("password", {
            required: "Password Required",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]+$/,
              message:
                "Password should contain uppercase and lowercase letter, number, and special character"
            },
            maxLength: { value: 20, message: "Password should not exceed 20 characters" }
          })}
        />
        {errors.password && <p className="error">{errors.password?.message}</p>}
      </div>
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
          placeholder="Phone"
          className="input"
          type="text"
          {...register("phone", {
            required: "Phone Required",
            pattern: {
              value: /^0\d{9}$/,
              message: "Phone number should be 10 digits and start with 0"
            }
          })}
        />
        {errors.phone && <p className="error">{errors.phone?.message}</p>}
      </div>
      <div className="btn_container">
        <button className="btn_register btn" type="submit">
          Register
        </button>
      </div>
    </form>
  )
}
