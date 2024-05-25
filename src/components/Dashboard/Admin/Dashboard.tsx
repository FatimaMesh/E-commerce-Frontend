import { FaBoxOpen, FaUsers } from "react-icons/fa"
import { BiCategoryAlt, BiSolidWatch } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

import { AppDispatch, RootState } from "@/services/store"
import "@/style/summary.css"
import { dispatchActions } from "./dispatch"

export const Dashboard = () => {
  const { totalItems: totalProduct } = useSelector((state: RootState) => state.productR)
  const { totalOrders } = useSelector((state: RootState) => state.orderR)
  const { totalUsers } = useSelector((state: RootState) => state.userR)
  const { categories } = useSelector((state: RootState) => state.categoryR)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatchActions(dispatch)
  }, [dispatch])

  return (
    <div className="summary-dashboard container">
      <h1>Admin Dashboard</h1>
      <div className="summary-card">
        <article className="users-summary">
          <div>
            <FaUsers />
          </div>
          <h2>Users</h2>
          <p>Total Users {totalUsers}</p>
        </article>
        <article className="products-summary">
          <div>
            <BiSolidWatch />
          </div>
          <h2>Products</h2>
          <p>Total Products {totalProduct}</p>
        </article>
        <article className="orders-summary">
          <div>
            <FaBoxOpen />
          </div>
          <h2>Orders</h2>
          <p>Total Orders {totalOrders}</p>
        </article>
        <article className="categories-summary">
          <div>
            <BiCategoryAlt />
          </div>
          <h2>Categories</h2>
          <p>Total Categories {categories.length}</p>
        </article>
      </div>
    </div>
  )
}
