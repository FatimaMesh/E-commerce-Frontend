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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/login" element={<Account />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
