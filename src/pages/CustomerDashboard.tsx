import { useState } from "react"

import "../style/dashboard.css"
import "../style/customer.css"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Sidebar from "@/components/Dashboard/Sidebar"
import { Cart } from "@/components/Dashboard/Customer/Cart"
import { Shop } from "@/components/Dashboard/Customer/Shop"
import { PageContext } from "@/context/PageContext"
import { Profile } from "@/components/Dashboard/Profile"
import { UserOrder } from "@/components/Dashboard/Customer/UserOrders"

export const CustomerDashboard = () => {
  const [openPage, setOpenPage] = useState<string>("shop")
  return (
    <PageContext.Provider value={{ openPage, setOpenPage }}>
      <section className="dashboard-layout container">
        <Header />
        <Sidebar />
        <main>
          {openPage === "cart" && <Cart />}
          {openPage === "shop" && <Shop />}
          {openPage === "order" && <UserOrder />}
          {openPage === "account" && <Profile />}
        </main>
        <Footer />
      </section>
    </PageContext.Provider>
  )
}
