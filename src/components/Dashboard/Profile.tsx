import { SubmitHandler, useForm } from "react-hook-form"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { errorMessage, successMessage } from "@/utility/notify"
import "../../style/profile.css"
import { UpdatePassword } from "./UpdatePassword"
import { AppDispatch, RootState } from "@/services/store"
import { updateProfile } from "@/services/slices/userSlice"
import { FormUpdateProfile } from "@/types"

export const Profile = () => {
  const { user } = useSelector((state: RootState) => state.userR)
  const dispatch: AppDispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormUpdateProfile>()

  // Set values to form fields with selected user info
  useEffect(() => {
    if (user) {
      setValue("fullName", user.fullName)
      setValue("email", user.email)
      setValue("phone", user.phone)
    }
  }, [user, setValue])

  const [updatePassword, setUpdatePassword] = useState(false)

  //update user profile
  const profileSubmit: SubmitHandler<FormUpdateProfile> = async (data) => {
    try {
      console.log(data)
      const response = await dispatch(
        updateProfile({ userId: user?.userId, userProfile: data })
      ).unwrap()
      successMessage(response.message)
    } catch (error) {
      errorMessage((error as Error).message)
    }
  }

  const handleUpdatePassword = () => {
    setUpdatePassword(!updatePassword)
  }

  return (
    <section className="user-profile">
      <h2>Profile</h2>
      <div className="profile-background"></div>
      <form onSubmit={handleSubmit(profileSubmit)}>
        <div className="field">
          <label htmlFor="user-fullName">Full Name</label>
          <input
            placeholder="Full name"
            className="input"
            type="text"
            id="user-fullName"
            {...register("fullName", {
              required: "FullName Required",
              minLength: { value: 3, message: "Should be more than 3 characters" }
            })}
          />
          {errors.fullName && <p className="error">{errors.fullName?.message}</p>}
        </div>
        <div className="field">
          <label htmlFor="user-email">Email</label>
          <input
            placeholder="Email"
            className="input"
            type="email"
            id="user-email"
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
          <label htmlFor="user-phone">Phone</label>
          <input
            placeholder="Phone"
            className="input"
            type="text"
            id="user-phone"
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
        <div className="field" id="join-date">
          <p>Join At</p>
          <p>{dayjs(user?.createdAt).format("MMM DD YYYY")}</p>
        </div>
        <div className="btn_container">
          <button className="btn_update btn" type="submit">
            Save Changes
          </button>
        </div>
      </form>
      <div>
        <h1></h1>
        {!updatePassword ? (
          <button className="btn" onClick={handleUpdatePassword}>
            Change Password
          </button>
        ) : (
          <UpdatePassword user={user} updatedPassword={handleUpdatePassword} />
        )}
      </div>
    </section>
  )
}
