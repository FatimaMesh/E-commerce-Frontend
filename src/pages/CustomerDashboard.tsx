import { useState } from "react"

import "../style/dashboard.css"
import "../style/customer.css"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { PageContext } from "@/context/PageContext"
import { Sidebar, Cart, Profile, Shop, UserOrder } from "@/components/dashboardContent"

export const CustomerDashboard = () => {
  const [openPage, setOpenPage] = useState<string>("shop")
  return (
    <PageContext.Provider value={{ openPage, setOpenPage }}>
      <Header />
      <main className="dashboard-layout">
        <Sidebar />
        <div className="dashboard-content">
          {openPage === "cart" && <Cart />}
          {openPage === "shop" && <Shop />}
          {openPage === "order" && <UserOrder />}
          {openPage === "account" && <Profile />}
        </div>
      </main>
      <Footer />
    </PageContext.Provider>
  )
}
