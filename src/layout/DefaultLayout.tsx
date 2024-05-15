import { BiSolidWatch } from "react-icons/bi"
import { Link } from "react-router-dom"

import Header from "../components/Dashboard/Header"
import Sidebar from "../components/Dashboard/Sidebar"
import { Footer } from "@/components/Footer"

const DefaultLayout = () => {
  return (
    <>
      <div className="dashboard-layout">
        <Header />
        <Sidebar />
        <main>
          <Link to="" className="btn">
            View Shop <BiSolidWatch />
          </Link>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default DefaultLayout
