import { useState } from "react"

import "../style/dashboard.css"
import {Header} from "@/components/Header"
import { Footer } from "@/components/Footer"
import Sidebar from "@/components/Dashboard/Sidebar"
import { Cart } from "@/components/Dashboard/Customer/Cart"
import { Shop } from "@/components/Dashboard/Customer/Shop"
import { PageContext } from "@/context/PageContext"

export const CustomerDashboard = () => {
  const [openPage, setOpenPage] = useState<string>("shop")
  return (
    <PageContext.Provider value={{ openPage, setOpenPage }}>
      <Header/>
      <section className="dashboard-layout container">
        <Sidebar />
        <main>
          {openPage === "cart" && <Cart />}
          {openPage === "shop" && <Shop />}
        </main>
      </section>
      <Footer />
    </PageContext.Provider>
  )
}
