export type Product = {
  productId: string
  name: string
  slug: string
  image: string
  description: string
  price: string
  createdAt: Date
  categoryId: string
}

export type Category = {
  categoryID: string
  name: string
  slug: number
}

export type User = {
  userID: string
  fullName: string
  phone: number
  email: string
  password: string
  createdAt: Date
  role: number
  isBanned: boolean
}
