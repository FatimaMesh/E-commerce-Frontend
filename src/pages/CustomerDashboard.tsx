// import { BiSolidWatch } from "react-icons/bi"
// import { Link } from "react-router-dom"

import "../style/dashboard.css"
import Header from "@/components/Dashboard/Header"
import { Footer } from "@/components/Footer"
import Sidebar from "@/components/Dashboard/Sidebar"

export const CustomerDashboard = () => {
  return (
    <>
      <div className="dashboard-layout">
        <Header />
        <Sidebar />
        <main>
          {/* <Link to="" className="btn">
            View Shop <BiSolidWatch />
          </Link> */}
        </main>
      </div>
      <Footer />
    </>
  )
}
