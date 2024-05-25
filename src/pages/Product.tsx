import { BiSearchAlt } from "react-icons/bi"
import { ChangeEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import "../style/product.css"
import { Pagination } from "@/components/Pagination"
import { fetchProducts } from "@/services/slices/productSlice"
import { AppDispatch, RootState } from "@/services/store"
import { fetchCategories } from "@/services/slices/categorySlice"

export const Products = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage] = useState<number>(8)
  const [keyWord, setKeyword] = useState<string | undefined>()
  const [orderBy, setOrderBy] = useState<number>(0)
  const [sortBy, setSortBy] = useState<number>(1)
  const [minPrice, setMinPrice] = useState<number>(1)
  const [maxPrice, setMaxPrice] = useState<number>(2000000)
  const [category, setCategory] = useState<string | undefined>()

  const { products, totalItems, isLoading, error } = useSelector(
    (state: RootState) => state.productR
  )
  const { categories } = useSelector((state: RootState) => state.categoryR)
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  // fetch products based on pagination
  useEffect(() => {
    dispatch(
      fetchProducts({
        currentPage,
        itemsPerPage,
        keyWord,
        category,
        orderBy,
        sortBy,
        minPrice,
        maxPrice
      })
    )
    dispatch(fetchCategories())
  }, [
    currentPage,
    itemsPerPage,
    keyWord,
    category,
    orderBy,
    sortBy,
    minPrice,
    maxPrice,
    totalItems
  ])

  //go to product detail
  const handleCardClick = (slug: string) => {
    navigate(`/products/${slug}`)
  }

  // Change page number
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // apply searching product
  const handlerKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  // apply searching product
  const handlerPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name == "min") {
      setMinPrice(Number(value))
    } else {
      setMaxPrice(Number(value))
    }
  }

  // apply sortBy
  const handlerSort = (e: ChangeEvent<HTMLSelectElement>) => setSortBy(Number(e.target.value))
  // apply orderBy
  const handlerOrder = (e: ChangeEvent<HTMLSelectElement>) => setOrderBy(Number(e.target.value))
  // apply orderBy
  const handlerCategory = (e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)

  return (
    <>
      {/* search part */}
      <aside className="product-search">
        <form onSubmit={(e) => e.preventDefault()}>
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
          <span>
            <label htmlFor="orderBy">OrderBy</label>
            <select value={orderBy} onChange={handlerOrder} id="orderBy">
              <option value={0}>ASC</option>
              <option value={1}>DESC</option>
            </select>
            <label htmlFor="sortBy">SortBy</label>
            <select value={sortBy} onChange={handlerSort} id="sortBy">
              <option value={1}>Date</option>
              <option value={0}>Name</option>
            </select>
          </span>
          <span>
            <label htmlFor="category-type">Category</label>
            <select value={category} onChange={handlerCategory} id="category-type">
              <option value="">All</option>
              {categories &&
                categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.name}
                  </option>
                ))}
            </select>
          </span>
          <span className="price-range">
            <label htmlFor="range">Price</label>
            <input
              type="text"
              id="min"
              name="min"
              placeholder="Min Price"
              onChange={handlerPrice}
              value={minPrice}
            />{" "}
            To
            <input
              type="text"
              id="max"
              name="max"
              placeholder="Max Price"
              onChange={handlerPrice}
              value={maxPrice}
            />
          </span>
        </form>
      </aside>
      {/* product card list */}
      <div className="product-container" id="product">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="product-cards">
            {products?.length ? (
              products.map((item) => (
                <div
                  className="card"
                  key={item.productId}
                  onClick={() => handleCardClick(item.slug)}
                >
                  <img src={item.image} alt={item.description} />
                  <h2>{item.name}</h2>
                  <p>{item.price} SR</p>
                  <div className="card-btn">
                    <button className="btn">Add to cart</button>
                  </div>
                </div>
              ))
            ) : (
              <div>No products match</div>
            )}
          </div>
        )}
        <Pagination itemsPerPage={itemsPerPage} totalItems={totalItems} paginate={paginate} />
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </>
  )
}
