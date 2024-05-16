// type for product
export type Product = {
  productId: string
  name: string
  slug: string
  image: string
  description: string
  price: number
  createdAt: Date
  categoryId: string

  category: Category
  reviews: Review[] 
  orderItems: OrderItem[] 
}

export interface ProductStates {
  products: Product[]
  product: Product | null
  isLoading: boolean
  error: string | null
}

export type FilterType = {
  currentPage: number
  itemsPerPage: number
  keyWord: string | undefined
  orderBy: number
  sortBy: number
  minPrice: number
  maxPrice: number
}

// type of category
export type Category = {
  categoryId: string
  name: string
  slug: number
  description: string

  products: Product[]
}

export type CategoryStates = {
  categories: Category[]
  category: Category | null
  isLoading: boolean
  error: string | null
}

// type of user
export type User = {
  userId?: string
  fullName: string
  phone: number
  email: string
  password: string
  createdAt: Date
  role: number
  isBanned: boolean

  orders: Order[]
  orderItems: OrderItem[]
  reviews: Review[]
}


export type UserState = {
  users: User[]
  user: User | null
  isLoading: boolean
  error: string | null
}

export type FormRegister = {
  fullName: string
  phone: number
  email: string
  password: string
}

export type FormLogin = {
  email: string
  password: string
}

// type of orderItem
export type OrderItem = {
  orderItemId: string
  quantity: number
  price: number
  productId: string
  userId: string
  orderId: string | null

  product: Product
  user: User
  order: Order | null
}

// type of order
export type Order = {
  orderId: string
  totalPrice: number
  orderDate: Date
  deliveryDate: Date
  deliveryAddress: string
  paymentMethod: string
  orderStatus: number
  userId: string

  user: User
  orderItems: OrderItem[]
}

// type of review
export type Review = {
  reviewId: string
  comment: string
  productId: string
  userId: string
  product: Product
  users: User[]
}
