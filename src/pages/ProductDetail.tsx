import { useParams } from "react-router-dom"

import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import "../style/productDetail.css"
import { ViewProduct } from "@/components/ViewProduct"

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>()

  return (
    <>
      <Header />
      <ViewProduct slug={slug} />
      <Footer />
    </>
  )
}
export default ProductDetail
