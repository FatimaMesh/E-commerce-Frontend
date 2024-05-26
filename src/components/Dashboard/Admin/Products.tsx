import { AppDispatch, RootState } from "@/services/store"
import { useDispatch, useSelector } from "react-redux"
import { ChangeEvent, ReactNode, useEffect, useState } from "react"
import dayjs from "dayjs"
import { BiEdit, BiSearchAlt, BiSolidWatch, BiTrash } from "react-icons/bi"

import { Pagination } from "@/components/Pagination"
import { fetchProducts } from "@/services/slices/productSlice"
import Popup from "@/components/Popup"
import { AddProduct, DeleteProduct, EditProduct } from "./ProductAction"
import { fetchCategories } from "@/services/slices/categorySlice"

export const Products = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage] = useState<number>(4)
  const [keyWord, setKeyword] = useState<string | undefined>()
  const orderBy = 0
  const sortBy = 1
  const category = ""
  const minPrice = 1
  const maxPrice = 2000000

  const {
    products,
    isLoading: isProductsLoading,
    totalItems,
    error
  } = useSelector((state: RootState) => state.productR)
  const dispatch: AppDispatch = useDispatch()

  // fetch products based on pagination/keyword only
  useEffect(() => {
    const fetchDate = async () => {
      await dispatch(
        fetchProducts({
          currentPage,
          itemsPerPage,
          keyWord,
          orderBy,
          sortBy,
          minPrice,
          maxPrice,
          category
        })
      )
    }
    fetchDate()
  }, [itemsPerPage, currentPage, keyWord, totalItems, category, dispatch])

  //fetch categories
  const { categories } = useSelector((state: RootState) => state.categoryR)
  const dispatchCategory: AppDispatch = useDispatch()

  useEffect(() => {
    dispatchCategory(fetchCategories())
  }, [dispatchCategory])

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

  // Change page number
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // apply searching product
  const handlerKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  return (
    <section className="container">
      <h1>
        <BiSolidWatch /> Products
      </h1>
      <aside className="product-action">
        <form action="" method="POST">
          <div className="search-container">
            <h2 className="search-btn">
              <BiSearchAlt />
            </h2>
            <input
              type="text"
              placeholder="Type to search..."
              className="search-input input"
              onChange={handlerKeyword}
            />
          </div>
        </form>
        <button
          className="btn"
          onClick={() => handleOpenPopup(<AddProduct categories={categories} />)}
        >
          Add Product
        </button>
      </aside>
      {isProductsLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="content product-content">
          <thead>
            <tr>
              <td>Product</td>
            </tr>
          </thead>
          <tbody>
            {products?.length ? (
              products.map((product) => (
                <tr className="product-row" key={product.productId}>
                  <td className="product-info">
                    <img src={product.image} alt={product.description} />
                    <div>
                      <p>{product.name}</p>
                      <p>{product.description}</p>
                      <p>{product.price} SR</p>
                      <p> {dayjs(product.createdAt).format("DD MM YYYY")}</p>
                    </div>
                  </td>
                  <td className="product-action">
                    <div
                      className="delete-btn"
                      onClick={() =>
                        handleOpenPopup(
                          <DeleteProduct id={product.productId} onclose={handleClosePopup} />
                        )
                      }
                    >
                      <BiTrash /> Delete
                    </div>
                    <div
                      className="edit-btn"
                      onClick={() => handleOpenPopup(<EditProduct product={product} />)}
                    >
                      <BiEdit /> Edit
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No Product found</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>
                {" "}
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={totalItems}
                  paginate={paginate}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      )}
      {error && <p className="error">{error}</p>}
      {isPopupOpen && <Popup onClose={handleClosePopup}>{popupContent}</Popup>}
    </section>
  )
}
