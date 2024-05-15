import { BrowserRouter, Route, Routes } from "react-router-dom"

import "./App.css"
import { Home, Products, ProductDetail, Error } from "./pages/pages"
import { Account } from "./components/Account"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element="" />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/login" element={<Account />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
