import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

import { AppDispatch } from "@/services/store"
import { errorMessage, successMessage } from "@/utility/notify"
import "../../style/profile.css"
import { updateUserPassword } from "@/services/slices/userSlice"
import { FormUpdatePassword, User } from "@/types"

export const UpdatePassword = ({
  user,
  updatedPassword
}: {
  user: User | null
  updatedPassword: () => void
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormUpdatePassword>()
  const dispatch: AppDispatch = useDispatch()

  //update user password
  const passwordSubmit: SubmitHandler<FormUpdatePassword> = async (data) => {
    try {
      console.log(data)
      const response = await dispatch(
        updateUserPassword({ userId: user?.userId, userPassword: data })
      ).unwrap()
      successMessage(response.message)
      updatedPassword()
    } catch (error) {
      errorMessage((error as Error).message)
    }
  }

  return (
    <form onSubmit={handleSubmit(passwordSubmit)}>
      <div className="field">
        <input
          placeholder="Old Password"
          id="old-password"
          className="input"
          type="password"
          {...register("oldPassword", {
            required: "Old Password Required"
          })}
        />
        {errors.oldPassword && <p className="error">{errors.oldPassword.message}</p>}
      </div>
      <div className="field">
        <input
          placeholder="New Password"
          className="input"
          type="password"
          id="new-password"
          {...register("newPassword", {
            required: "New Password Required",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]+$/,
              message:
                "New Password should contain uppercase and lowercase letter, number, and special character"
            },
            maxLength: { value: 20, message: "New Password should not exceed 20 characters" }
          })}
        />
        {errors.newPassword && <p className="error">{errors.newPassword.message}</p>}
      </div>
      <div className="password-form-btn">
        <button className="btn" type="submit">
          Update Password
        </button>
        <button className="btn" type="button" onClick={updatedPassword}>
          Close
        </button>
      </div>
    </form>
  )
}
