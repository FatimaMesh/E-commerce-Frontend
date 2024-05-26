import { fetchUserReview } from "@/services/slices/reviewSlice"
import { AppDispatch, RootState } from "@/services/store"
import { ReactNode, useEffect, useState } from "react"
import { BiComment } from "react-icons/bi"
import { FaTrash } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import "@/style/review.css"
import Popup from "@/components/Popup"
import { DeleteReview } from "./DeleteReview"

export const UserReview = () => {
  const { userReviews, isLoading } = useSelector((state: RootState) => state.reviewR)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchReview = async () => {
      await dispatch(fetchUserReview())
    }
    fetchReview()
  }, [])

  //popup window for add/edit/delete product
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [popupContent, setPopupContent] = useState<ReactNode | null>(null)

  const handleOpenPopup = (content: ReactNode) => {
    setPopupContent(content)
    setIsPopupOpen(true)
  }

  const handleClosePopup = () => {
    setPopupContent(null)
    setIsPopupOpen(false)
  }
  return (
    <section className="container">
      <h1>
        <BiComment /> Review
      </h1>
      <div className="review-info">
        {isLoading && <p>Loading..</p>}
        {userReviews.length ? (
          userReviews.map((review) => (
            <article key={review.reviewId}>
              <div>
                <img src={review.product.image} alt="" />
                <p>{review.product.name}</p>
              </div>
              <div className="comment">
                <text>
                  <p style={{ color: "goldenrod" }}>Your review</p>
                  <p>{review.comment}</p>
                </text>
                <button
                  className="delete-btn"
                  type="button"
                  onClick={() =>
                    handleOpenPopup(
                      <DeleteReview id={review.reviewId} onclose={handleClosePopup} />
                    )
                  }
                >
                  <FaTrash />
                </button>
              </div>
            </article>
          ))
        ) : (
          <p className="no-content">Share your opinion Now !</p>
        )}
        {/* {error && <p className="error">{error}</p>} */}
      </div>
      {isPopupOpen && <Popup onClose={handleClosePopup}>{popupContent}</Popup>}
    </section>
  )
}
