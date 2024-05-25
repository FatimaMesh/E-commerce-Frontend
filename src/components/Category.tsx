import { ReactNode, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import "../style/product.css"
import { AppDispatch, RootState } from "@/services/store"
import { fetchCategories } from "@/services/slices/categorySlice"
import Popup from "./Popup"

export const CategoryCard = () => {
  const { categories, isLoading, error } = useSelector((state: RootState) => state.categoryR)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchCategory = async () => {
      await dispatch(fetchCategories())
    }
    fetchCategory()
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
    <>
      <h1 className="category-home">What are you shopping for today?</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <section className="category" id="category">
          {categories?.map((item) => (
            <div
              className="category-card"
              key={item.slug}
              onClick={() =>
                handleOpenPopup(
                  <div className="popup-window popup-description">{item.description}</div>
                )
              }
            >
                <h2>{item.name}</h2>
            </div>
          ))}
          {error && <p className="text-red-500">{error}</p>}
        </section>
      )}
      {isPopupOpen && <Popup onClose={handleClosePopup}>{popupContent}</Popup>}
    </>
  )
}
