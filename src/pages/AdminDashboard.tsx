import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import AdminSidebar from "@/components/Dashboard/Admin/AdminSidebar"
import "../style/admin.css"
import "../style/dashboard.css"
import { useState } from "react"
import { PageContext } from "@/context/PageContext"
import { Users } from "@/components/Dashboard/Admin/Users"
import { Products } from "@/components/Dashboard/Admin/Products"
import { Profile } from "@/components/Dashboard/Profile"
import { Category } from "@/components/Dashboard/Admin/Category"
import { Orders } from "@/components/Dashboard/Admin/Orders"

export const AdminDashboard = () => {
  const [openPage, setOpenPage] = useState<string>("dashboard")

  return (
    <PageContext.Provider value={{ openPage, setOpenPage }}>
      <div className="dashboard-layout container">
        <Header />
        <AdminSidebar />
        <main className="admin-dashboard">
          {openPage === "users" && <Users />}
          {openPage === "products" && <Products />}
          {openPage === "account" && <Profile />}
          {openPage === "category" && <Category />}
          {openPage === "orders" && <Orders />}
        </main>
        <Footer />
      </div>
    </PageContext.Provider>
  )
}
