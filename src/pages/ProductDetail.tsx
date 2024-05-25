import { useParams } from "react-router-dom"
import { BiSend } from "react-icons/bi"

import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import "../style/productDetail.css"
import { ViewProduct } from "@/components/ViewProduct"

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>()

  return (
    <>
      <Header />
      <main className="main-container">
        <ViewProduct slug={slug} />
      </main>
      <Footer />
    </>
  )
}
export default ProductDetail
