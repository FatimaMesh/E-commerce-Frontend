import { useEffect, useState } from "react"

import api from "@/api"
import "../style/product.css"
import { Category } from "@/types"

export const CategoryCard = () => {
  const [data, setData] = useState<Category[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await api.get(`/categories`)
        setData(response.data.data.$values)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setError("Something went wrong")
      }
    }
    fetchData()
  }, [])
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <section className="category" id="category">
          {data?.map((item) => (
            <div className="category-card" key={item.slug}>
              <div className="card-text">
                <h2 className="category-name">{item.name}</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur doloremque
                  sapiente deleniti commodi laudantium? Illum, odio adipisci.
                </p>
              </div>
            </div>
          ))}
          {error && <p className="text-red-500">{error}</p>}
        </section>
      )}
    </>
  )
}
