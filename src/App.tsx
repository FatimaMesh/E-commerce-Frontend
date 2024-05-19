import { BrowserRouter, Route, Routes } from "react-router-dom"

import "./App.css"
import {
  Home,
  Products,
  ProductDetail,
  Error,
  Account,
  AdminDashboard,
  CustomerDashboard
} from "./pages/pages"
import { ProtectAdminRoute, ProtectCustomerRoute } from "./router/ProtectRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectCustomerRoute />}>
          <Route path="/dashboard/customer" element={<CustomerDashboard />} />
        </Route>
        <Route element={<ProtectAdminRoute />}>
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
        </Route>
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/login" element={<Account />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
