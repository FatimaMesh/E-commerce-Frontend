import { BiShoppingBag } from "react-icons/bi"

import { Products } from "@/pages/Product"

export const Shop = () => {
  return (
    <section className="shop-container">
      <h1>
        <BiShoppingBag /> Shop
      </h1>
      <Products />
    </section>
  )
}
