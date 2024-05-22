import { MouseEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BiCart, BiCommentDetail } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import dayjs from "dayjs"

import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import "../style/productDetail.css"
import { AppDispatch, RootState } from "@/services/store"
import { fetchSingleProduct } from "@/services/slices/productSlice"
import { errorMessage, successMessage } from "@/utility/notify"
import { cartData } from "@/types"
import { addToCart } from "@/services/slices/orderItemsSlice"

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const dispatch: AppDispatch = useDispatch()
  const { product, reviews, isLoading, error } = useSelector((state: RootState) => state.productR)

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

  //add product to cart
  const handlerAddToCart = async ({ productId, quantity }: cartData) => {
    try {
      const response = await dispatch(addToCart({ productId, quantity })).unwrap()
      successMessage(response.message)
    } catch (error) {
      errorMessage((error as Error).message)
    }
  }

  return (
    <>
      <Header />
      <main className="container">
        <section className="product-detail">
          {isLoading && <p>loading ...</p>}
          {product && (
            <div className="detail-container" key={product.productId}>
              <div className="image-detail">
                <img src={product.image} alt={product.description} />
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
                  <button
                    className="btn"
                    type="button"
                    onClick={() =>
                      handlerAddToCart({ productId: product.productId, quantity: quantity })
                    }
                  >
                    <BiCart />
                    Add to cart
                  </button>
                </form>
              </div>
            </div>
          )}
          {error && <p className="text-red-500">{error}</p>}
        </section>
        <section className="review-product">
          <h2>
            <BiCommentDetail /> Review
          </h2>
          <div className="review-container">
            {reviews?.length ? (
              reviews.map((item) => <p key={item.reviewId}>{item.comment}</p>)
            ) : (
              <p className="no-review">No Review yet!</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
export default ProductDetail
