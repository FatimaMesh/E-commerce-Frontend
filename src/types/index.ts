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

export type FormProduct = {
  name: string
  image: string
  description: string
  price: number
  categoryId: string
}

export interface ProductStates {
  products: Product[]
  product: Product | null
  reviews: Review[] | null
  isLoading: boolean
  totalItems: number
  error: string | null
}

export type FilterType = {
  currentPage: number
  itemsPerPage: number
  keyWord: string | undefined
  orderBy: number
  sortBy: number
  category: string | undefined
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

export type FormCategory = {
  name: string
  description: string
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

export type FilterUser = {
  currentPage: number
  itemsPerPage: number
  orderBy: number
  sortBy: number
}

export type UserState = {
  users: User[]
  user: User | null
  isLoading: boolean
  totalUsers: number
  error: string | null
  isLoggedIn: boolean
}

export type FormUpdateProfile = {
  fullName: string
  phone: number
  email: string
}

export type FormUpdatePassword = {
  newPassword: string
  oldPassword: string
}

export type UserBehavior = {
  role: number
  isBanned: boolean
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

export type cartData = {
  productId: string
  quantity: number
}

export type localCartItems = {
  product: Product
  quantity: number
}
export type orderItemsStates = {
  orderItems: OrderItem[]
  orderItem: OrderItem | null
  isLoading: boolean
  error: string | null
  localCart: localCartItems[]
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

export type orderStates = {
  orders: Order[]
  userOrders: Order[]
  order: Order | null
  totalOrders: number
  totalUserOrders: number
  isLoading: boolean
  error: string | null
}

export type FormOrder = {
  deliveryAddress: string
  paymentMethod: string
}

// type of review
export type Review = {
  reviewId: string
  comment: string
  productId: string
  userId: string
  product: Product
  user: User
}

export type ReviewStates = {
  reviews: Review[]
  userReviews: Review[]
  review: Review | null
  isLoading: boolean
  error: string | null
}

export type ReviewForm = {
  comment: string
}
