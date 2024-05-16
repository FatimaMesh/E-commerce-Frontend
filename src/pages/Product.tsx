import { BiSearchAlt} from "react-icons/bi"
import { ChangeEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import "../style/product.css"
import { Pagination } from "@/components/Pagination"
import { fetchProducts } from "@/services/slices/productSlice"
import { AppDispatch, RootState } from "@/services/store"

export const Products = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage] = useState<number>(8)
  const [keyWord, setKeyword] = useState<string | undefined>()
  const [orderBy, setOrderBy] = useState<number>(0)
  const [sortBy, setSortBy] = useState<number>(1)
  const [minPrice, setMinPrice] = useState<number>(1)
  const [maxPrice, setMaxPrice] = useState<number>(2000000)

  const { products, isLoading, error } = useSelector((state: RootState) => state.productR)
  const dispatch: AppDispatch = useDispatch()

  const navigate = useNavigate()

  // fetch products based on pagination
  useEffect(() => {
    const fetchDate = async () => {
      await dispatch(
        fetchProducts({ currentPage, itemsPerPage, keyWord, orderBy, sortBy, minPrice, maxPrice })
      )
    }
    fetchDate()
  }, [currentPage, itemsPerPage, keyWord, orderBy, sortBy, minPrice, maxPrice])

  //go to product detail
  const handleCardClick = (productId: string) => {
    navigate(`/products/${productId}`)
  }

  // Change page number
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // apply searching product
  const handlerKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { value } = e.target
    setKeyword(value)
  }

  // apply searching product
  const handlerPrice = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const price = e.target.name
    if (price == "min") {
      setMinPrice(Number(e.target.value))
      return
    }
    setMaxPrice(Number(e.target.value))
  }

  // apply sortBy
  const handlerSort = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    const { value } = e.target
    setSortBy(Number(value))
  }

  // apply orderBy
  const handlerOrder = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    const { value } = e.target
    setOrderBy(Number(value))
  }

  return (
    <section className="product" id="product">
      <div className="product-search">
        <form>
          <span>
            <h2>
              <BiSearchAlt></BiSearchAlt>
            </h2>
            <input
              type="text"
              id="search"
              name="search"
              value={keyWord}
              className="input"
              onChange={handlerKeyword}
              placeholder="search...."
            />
          </span>
          <span>
            <label htmlFor="orderBy">OrderBy</label>
            <select value={orderBy} className="input" onChange={handlerOrder}>
              <option value={0}>ASC</option>
              <option value={1}>DESC</option>
            </select>
            <label htmlFor="sortBy">SortBy</label>
            <select value={sortBy} className="input" onChange={handlerSort}>
              <option value={1}>Date</option>
              <option value={0}>Name</option>
            </select>
          </span>
          <span className="price-range">
            <label htmlFor="range">Price</label>
            <input
              type="text"
              id="min"
              name="min"
              className="input"
              placeholder="Min Price"
              onChange={handlerPrice}
              value={minPrice}
            />{" "}
            To
            <input
              type="text"
              id="max"
              name="max"
              className="input"
              placeholder="Max Price"
              onChange={handlerPrice}
              value={maxPrice}
            />
          </span>
        </form>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-cards">
          {products?.map((item) => (
            <div
              className="card"
              key={item.productId}
              onClick={() => handleCardClick(item.productId)}
            >
              <div className="card-image">
                <img src={item.image} alt="product image" />
              </div>
              <div className="card-text">
                <h2 className="product-name">{item.name}</h2>
              </div>
              <p>{item.price} SR</p>
              <div className="card-btn">
                <button className="btn">Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Pagination itemsPerPage={itemsPerPage} totalItems={10} paginate={paginate} />
      {error && <p className="text-red-500">{error}</p>}
    </section>
  )
}
