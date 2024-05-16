import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import "../style/product.css"
import { AppDispatch, RootState } from "@/services/store"
import { fetchCategories } from "@/services/slices/categorySlice"

export const CategoryCard = () => {
  const { categories, isLoading, error } = useSelector((state: RootState) => state.categoryR)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories())
    }
    fetchData()
  }, [])
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <section className="category" id="category">
          {categories?.map((item) => (
            <div className="category-card" key={item.slug}>
              <div className="card-text">
                <h2 className="category-name">{item.name}</h2>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
          {error && <p className="text-red-500">{error}</p>}
        </section>
      )}
    </>
  )
}
