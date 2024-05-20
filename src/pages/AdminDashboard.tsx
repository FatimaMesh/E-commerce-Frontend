import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import AdminSidebar from "@/components/Dashboard/Admin/AdminSidebar"
import "../style/admin.css"
import "../style/dashboard.css"
import { useState } from "react"
import { PageContext } from "@/context/PageContext"
import { Users } from "@/components/Dashboard/Admin/Users"
import { Products } from "@/components/Dashboard/Admin/Products"

export const AdminDashboard = () => {
  const [openPage, setOpenPage] = useState<string>("dashboard")

  return (
    <PageContext.Provider value={{ openPage, setOpenPage }}>
      <Header />
      <div className="dashboard-layout container">
        <AdminSidebar />
        <main className="admin-dashboard">
          {openPage === "users" && <Users />}
          {openPage === "products" && <Products />}
        </main>
      </div>
      <Footer />
    </PageContext.Provider>
  )
}
