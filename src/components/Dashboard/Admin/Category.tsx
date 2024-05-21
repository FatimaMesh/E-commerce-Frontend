import { ReactNode, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BiCategory, BiEdit, BiTrash } from "react-icons/bi"

import { AppDispatch, RootState } from "@/services/store"
import { fetchCategories } from "@/services/slices/categorySlice"
import Popup from "@/components/Popup"
import { CategoryModify, DeleteCategory } from "./CategoryAction"

export const Category = () => {
  const { categories, isLoading } = useSelector((state: RootState) => state.categoryR)
  const dispatchData: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchCategory = async () => {
      await dispatchData(fetchCategories())
    }
    fetchCategory()
  }, [dispatchData])

  //popup window for add/edit/delete category
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
        <BiCategory /> Categories
      </h1>
      <button className="btn" onClick={() => handleOpenPopup(<CategoryModify category={null} />)}>
        Add Category
      </button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="content category-content">
          <thead>
            <tr>
              <td>Category</td>
            </tr>
          </thead>
          <tbody>
            {categories?.length ? (
              categories.map((category) => (
                <tr className="category-row" key={category.categoryId}>
                  <td className="category-info">
                    <p className="category-name">{category.name}</p>
                    <p>{category.description}</p>
                  </td>
                  <td className="category-action">
                    <div
                      className="delete-btn"
                      onClick={() =>
                        handleOpenPopup(
                          <DeleteCategory id={category.categoryId} onclose={handleClosePopup} />
                        )
                      }
                    >
                      <BiTrash /> Delete
                    </div>
                    <div
                      className="edit-btn"
                      onClick={() => handleOpenPopup(<CategoryModify category={category} />)}
                    >
                      <BiEdit /> Edit
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No category found</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Total Category {categories.length}</td>
            </tr>
          </tfoot>
        </table>
      )}
      {isPopupOpen && <Popup onClose={handleClosePopup}>{popupContent}</Popup>}
    </section>
  )
}
