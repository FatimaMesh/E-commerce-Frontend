import { deleteUser, updateUserBehavior } from "@/services/slices/userSlice"
import { AppDispatch } from "@/services/store"
import { User } from "@/types"
import { errorMessage, successMessage } from "@/utility/notify"
import { useState } from "react"
import { useDispatch } from "react-redux"

export type UserBehavior = {
  role: number
  isBanned: boolean
}
export const UpdateUser = ({ user }: { user: User }) => {
  const [isBanned, setIsBanned] = useState(user.isBanned)
  const [isAdmin, setIsAdmin] = useState(user.role === 1)
  const dispatch: AppDispatch = useDispatch()

  const handleSaveChanges = async () => {
    try {
      const updateBehavior = {
        isBanned: isBanned,
        role: isAdmin ? 1 : 0
      }
      const response = await dispatch(
        updateUserBehavior({ userId: user.userId, userBehavior: updateBehavior })
      ).unwrap()
      successMessage(response.message)
    } catch (error) {
      errorMessage((error as Error).message)
    }
  }

  const handleDeleteUser = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?")
    if (isConfirmed) {
      try {
        await dispatch(deleteUser(user.userId)).unwrap()
        successMessage(`User ${user.fullName} Deleted successfully`)
      } catch (error) {
        errorMessage((error as Error).message)
      }
    }
  }
  return (
    <section className="user-behavior">
      <h1>Update User Behavior</h1>
      <p>{user.fullName}</p>
      <p>{user.email}</p>
      <div className="behavior">
        <p>Block</p>
        <div className="check">
          <input
            id="isBanned-check"
            type="checkbox"
            checked={isBanned}
            onChange={(e) => setIsBanned(e.target.checked)}
          />
          <label htmlFor="isBanned-check"></label>
        </div>
      </div>
      <div className="behavior">
        <p>Admin</p>
        <div className="check">
          <input
            id="role-check"
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          <label htmlFor="role-check"></label>
        </div>
      </div>
      <div className="action">
        <button className="btn" onClick={handleSaveChanges}>
          Save Changes
        </button>
        <button className="btn" onClick={handleDeleteUser}>
          Delete User
        </button>
      </div>
    </section>
  )
}
