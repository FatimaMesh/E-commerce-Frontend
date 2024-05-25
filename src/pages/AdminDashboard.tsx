import { useState } from "react"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { PageContext } from "@/context/PageContext"
import "../style/admin.css"
import "../style/dashboard.css"
import {
  AdminSidebar,
  Users,
  Products,
  Profile,
  Category,
  Orders,
  Dashboard
} from "@/components/dashboardContent"

export const AdminDashboard = () => {
  const [openPage, setOpenPage] = useState<string>("dashboard")

  return (
    <PageContext.Provider value={{ openPage, setOpenPage }}>
      <Header />
      <main className="dashboard-layout">
        <AdminSidebar />
        <div className="dashboard-content">
          {openPage === "dashboard" && <Dashboard />}
          {openPage === "users" && <Users />}
          {openPage === "products" && <Products />}
          {openPage === "account" && <Profile />}
          {openPage === "category" && <Category />}
          {openPage === "orders" && <Orders />}
        </div>
      </main>
      <Footer />
    </PageContext.Provider>
  )
}
