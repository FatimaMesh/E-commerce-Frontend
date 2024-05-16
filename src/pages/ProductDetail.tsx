import { MouseEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BiCart } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"

import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import "../style/productDetail.css"
import { AppDispatch, RootState } from "@/services/store"
import { fetchSingleProduct } from "@/services/slices/productSlice"
import dayjs from "dayjs"

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const dispatch: AppDispatch = useDispatch()
  const { product, isLoading, error } = useSelector((state: RootState) => state.productR)

  const [quantity, setQuantity] = useState<number>(1)

  const increment = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setQuantity(quantity + 1)
  }

  const decrement = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setQuantity(quantity - 1)
  }

  // fetch product based on productId
  useEffect(() => {
    const fetchDate = async () => {
      await dispatch(fetchSingleProduct(slug))
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
                  <p>Category : {product.category.name}</p>
                  <p>Added At : {dayjs(product.createdAt).format("MMM DD YYYY")}</p>
                </div>
                <p>{product.price} SR</p>
              </div>
              <form className="action">
                <div className="quantity">
                  <button onClick={increment}>+</button>
                  <h3>{quantity}</h3>
                  <button onClick={decrement} disabled={quantity > 1 ? false : true}>
                    -
                  </button>
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
