import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { BiCart } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"

import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import "../style/productDetail.css"
import { AppDispatch, RootState } from "@/services/store"
import { fetchSingleProduct } from "@/services/slices/productSlice"

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>()

  const dispatch: AppDispatch = useDispatch()
  const { product, isLoading, error } = useSelector((state: RootState) => state.productR)

  // fetch product based on productId
  useEffect(() => {
    const fetchDate = async () => {
      await dispatch(fetchSingleProduct(productId))
    }
    fetchDate()
  }, [])

  return (
    <>
      <Header />
      <section className="product-detail">
        {isLoading && <p>loading ...</p>}
        {product && (
          <div className="detail-container" key={product.productId}>
            <div className="image-detail">
              <img src={product.image} alt="" />
            </div>
            <div className="detail">
              <div className="info">
                <h3 className="title">{product.name}</h3>
                <p>{product.description}</p>
                <div>
                  <p>Gender women</p>
                </div>
                <p>price : {product.price} SR</p>
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
        {error && <p className="text-red-500">{error}</p>}
      </section>
      <Footer />
    </>
  )
}
export default ProductDetail
