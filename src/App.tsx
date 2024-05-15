import { BrowserRouter, Route, Routes } from "react-router-dom"

import "./App.css"
import { Home, Products, ProductDetail, Error, Account } from "./pages/pages"
import { CustomerDashboard } from "./pages/CustomerDashboard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<CustomerDashboard/>} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/login" element={<Account />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
