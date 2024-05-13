import { Button } from "./components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "./components/ui/card"
import { Product } from "./types"
import api from "./api"

import "./App.css"
import { useEffect, useState } from "react"

function App() {
  const [data, setData] = useState<Product[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const getProducts = async () => {
    try {
      const res = await api.get("/products")
      console.log(res.data.data)
      setData(res.data.data.$values)
      setError(null)
    } catch (error) {
      console.error(error)
      setError("Something went wrong")
    }
  }
  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className="App">
      <h1 className="text-2xl uppercase mb-10">Products</h1>

      <section className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto">
        {data?.map((product) => (
          <Card key={product.productId} className="w-[350px]">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{product.price}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add to cart</Button>
            </CardFooter>
          </Card>
        ))}
      </section>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

export default App
