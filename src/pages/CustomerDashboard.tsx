// import { BiSolidWatch } from "react-icons/bi"
// import { Link } from "react-router-dom"

import "../style/dashboard.css"
import Header from "@/components/Dashboard/Header"
import { Footer } from "@/components/Footer"
import Sidebar from "@/components/Dashboard/Sidebar"
import { Cart } from "@/components/Cart"

export const CustomerDashboard = () => {
  return (
    <>
      <div className="dashboard-layout">
        <Header />
        <Sidebar />
        <main>
          <Cart/>
          {/* <Link to="" className="btn">
            View Shop <BiSolidWatch />
          </Link> */}
        </main>
      </div>
      <Footer />
    </>
  )
}
