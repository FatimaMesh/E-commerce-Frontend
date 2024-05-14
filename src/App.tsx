import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import { Products } from "./pages/Product"
import { Home } from "./pages/Home"
import ProductDetail from "./pages/ProductDetail"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element="" />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetail/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
