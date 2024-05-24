import { BoxIcon, Users2Icon, WatchIcon } from "lucide-react"
import { BiCategoryAlt } from "react-icons/bi"
import { useSelector } from "react-redux"

import { RootState } from "@/services/store"
import "@/style/summary.css"
export const Dashboard = () => {
  const { totalItems: totalProduct} = useSelector((state: RootState) => state.productR)
  const { totalOrders } = useSelector((state: RootState) => state.orderR)
  const { totalUsers } = useSelector((state: RootState) => state.userR)
  const { categories } = useSelector((state: RootState) => state.categoryR)
  return (
    <div className="summary-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="summary-card">
        <article className="users-summary">
          <div>
            <Users2Icon />
          </div>
          <h2>Users</h2>
          <p>Total Users {totalUsers}</p>
        </article>
        <article className="products-summary">
          <div>
            <WatchIcon />
          </div>
          <h2>Products</h2>
          <p>Total Products {totalProduct}</p>
        </article>
        <article className="orders-summary">
          <div>
            <BoxIcon />
          </div>
          <h2>Orders</h2>
          <p>Total Orders {totalOrders}</p>
        </article>
        <article className="categories-summary">
          <div>
            <BiCategoryAlt/>
          </div>
          <h2>Categories</h2>
          <p>Total Categories {categories.length}</p>
        </article>
      </div>
    </div>
  )
}
