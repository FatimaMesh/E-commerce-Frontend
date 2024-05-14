import { BiSearchAlt, BiSort } from "react-icons/bi"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import "../style/product.css"
import api from "@/api"
import { Product } from "@/types"
import { Pagination } from "@/components/Pagination"

export const Products = () => {
  const [data, setData] = useState<Product[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage] = useState<number>(5)

  const navigate = useNavigate()

  const handleCardClick = (productId: string) => {
    navigate(`/products/${productId}`)
  }

  // fetch products based on pagination
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await api.get(
          `/products?page=${currentPage}&limit=${itemsPerPage}&minPrice=1&maxPrice=20000`
        )
        setData(response.data.data.$values)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setError("Something went wrong")
      }
    }
    fetchData()
  }, [currentPage, itemsPerPage])

  // Change page number
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <section className="product" id="product">
      <div className="product-search">
        <form>
          <span>
            <button className="btn">
              <BiSearchAlt></BiSearchAlt> Search
            </button>
            <input
              type="text"
              id="search"
              name="search"
              className="input"
              placeholder="search...."
            />
          </span>
          <span>
            <label htmlFor="search">Order by</label>
            <select className="input">
              <option>ASC</option>
              <option>ASC</option>
            </select>
          </span>
          <span>
            <button className="btn">
              <BiSort></BiSort> Sort by
            </button>
          </span>
        </form>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-cards">
          {data?.map((item) => (
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
