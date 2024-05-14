import { useState } from "react"
import { useParams } from "react-router-dom"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { BiCart } from "react-icons/bi"

import api from "@/api"
import "../style/productDetail.css"
import { Product } from "@/types"

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>()
  const [productDetail, setProductDetail] = useState<Product>()

  const fetchProductDetail = async () => {
    try {
      const response = await api.get(`/products/${productId}`)
      setProductDetail(response.data.data)
    } catch (error) {
      console.error("Error fetching product detail:", error)
    }
  }

  fetchProductDetail()

  return (
    <>
      <Header />
      <section className="product-detail">
        {productDetail && (
          <div className="detail-container">
            <div className="image-detail">
              <img src={productDetail.image} alt="" />
            </div>
            <div className="detail">
              <div className="info">
                <h3 className="title">{productDetail.name}</h3>
                <p>{productDetail.description}</p>
                <div>
                  <p>Gender women</p>
                </div>
                <p>price : {productDetail.price} SR</p>
              </div>
              <form className="action">
                <div className="quantity">
                  <button>+</button>
                  <h3>1</h3>
                  <button>-</button>
                </div>
                <button className="btn">
                  <BiCart />
                  Add to cart
                </button>
              </form>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  )
}
export default ProductDetail
