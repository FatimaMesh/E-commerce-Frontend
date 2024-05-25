import { MouseEvent, useEffect, useState } from "react"
import { BiCart, BiCommentDetail } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import dayjs from "dayjs"

import { AppDispatch, RootState } from "@/services/store"
import { fetchSingleProduct } from "@/services/slices/productSlice"
import { addToCart, addToLocalCart } from "@/services/slices/orderItemsSlice"
import { errorMessage, successMessage } from "@/utility/notify"
import { Product } from "@/types"
import { Review } from "./ReviewForm"

export const ViewProduct = ({ slug }: { slug: string | undefined }) => {
  const dispatch: AppDispatch = useDispatch()
  const { product, reviews, isLoading, error } = useSelector((state: RootState) => state.productR)
  const { isLoggedIn } = useSelector((state: RootState) => state.userR)
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
  }, [dispatch, reviews])

  //add product to cart
  const handlerAddToCart = async ({
    productData,
    quantity
  }: {
    productData: Product
    quantity: number
  }) => {
    try {
      if (isLoggedIn) {
        const response = await dispatch(
          addToCart({ productId: productData.productId, quantity: quantity })
        ).unwrap()
        successMessage(response.message)
      } else {
        dispatch(addToLocalCart({ product, quantity }))
        successMessage("Product added to cart. Please login to complete the purchase.")
      }
    } catch (error) {
      errorMessage((error as Error).message)
    }
  }

  return (
    <>
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
                  onClick={() => handlerAddToCart({ productData: product, quantity: quantity })}
                >
                  <BiCart />
                  Add to cart
                </button>
              </form>
            </div>
          </div>
        )}
        {error && <p className="error">{error}</p>}
      </section>
      <section className="review-product">
        <h2>
          <BiCommentDetail /> Review
        </h2>
        <div className="review-container">
          {reviews?.length ? (
            reviews.map((item) => (
              <div className="review-item" key={item.reviewId}>
                <p className="review-comment">{item.comment}</p>
              </div>
            ))
          ) : (
            <p className="no-review">No Review yet!</p>
          )}
        </div>
      </section>
      {/* review form */}
      {isLoggedIn && <Review productId={product?.productId} />}
    </>
  )
}
