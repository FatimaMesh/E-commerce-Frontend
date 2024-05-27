import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import { Account } from "@/pages/Account"
import { RootState } from "@/services/store"

//protect Customer route
export const ProtectCustomerRoute = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.userR)
  return isLoggedIn ? <Outlet /> : <Account />
}

//protect Admin route
export const ProtectAdminRoute = () => {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.userR)
  return isLoggedIn && user?.role === 1 ? <Outlet /> : <Account />
}
