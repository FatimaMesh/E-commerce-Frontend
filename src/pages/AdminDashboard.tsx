import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import dayjs from "dayjs"

import Header from "../components/Dashboard/Header"
import { Footer } from "@/components/Footer"
import { AppDispatch, RootState } from "@/services/store"
import { fetchUsers } from "@/services/slices/userSlice"
import AdminSidebar from "@/components/Dashboard/AdminSidebar"
import "../style/dashboard.css"
import "../style/admin.css"
import { BiEdit } from "react-icons/bi"
import { Pagination } from "@/components/Pagination"

export const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage] = useState<number>(5)
  const { users, isLoading, error } = useSelector((state: RootState) => state.userR)
  const dispatch: AppDispatch = useDispatch()

  // fetch products based on pagination
  useEffect(() => {
    const fetchDate = async () => {
      await dispatch(fetchUsers({ currentPage, itemsPerPage }))
    }
    fetchDate()
  }, [itemsPerPage, currentPage])

  // Change page number
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      <div className="dashboard-layout">
        <Header />
        <AdminSidebar />
        <main className="admin-dashboard">
          <h1>Users</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <table className="content">
              <thead>
                <tr>
                  <td>User</td>
                  <td>Status</td>
                  <td>Role</td>
                  <td className="create-at">Created At</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {users?.length ? (
                  users.map((user) => (
                    <tr className="user-row" key={user.userId}>
                      <td>
                        <p>{user.fullName}</p>
                        <p>{user.email}</p>
                        <p>{user.phone}</p>
                      </td>
                      <td className="is-banned">
                        {user.isBanned ? (
                          <p className="in-active-user">InActive</p>
                        ) : (
                          <p className="active-user">Active</p>
                        )}
                      </td>
                      <td className="role">{user.role == 0 ? <p>User</p> : <p>Admin</p>}</td>
                      <td className="create-at">{dayjs(user.createdAt).format("DD MM YYYY")}</td>
                      <td className="actions">
                        <BiEdit />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>No users found</td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={5}>
                    {" "}
                    <Pagination itemsPerPage={itemsPerPage} totalItems={10} paginate={paginate} />
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
          {error && <p className="text-red-500">{error}</p>}
        </main>
      </div>
      <Footer />
    </>
  )
}
