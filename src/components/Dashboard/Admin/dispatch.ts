import { fetchCategories } from "@/services/slices/categorySlice"
import { fetchAllOrder } from "@/services/slices/orderSlice"
import { fetchProducts } from "@/services/slices/productSlice"
import { fetchUsers } from "@/services/slices/userSlice"
import { AppDispatch } from "@/services/store"

//for update total number for all the info
export const dispatchActions = (dispatch: AppDispatch) => {
  dispatch(fetchUsers({ currentPage: 1, itemsPerPage: 5, sortBy: 1, orderBy: 0 }))
  dispatch(
    fetchProducts({
      currentPage: 1,
      itemsPerPage: 5,
      keyWord: "",
      sortBy: 1,
      category:"",
      orderBy: 0,
      minPrice: 1,
      maxPrice: 200000000
    })
  )
  dispatch(fetchCategories())
  dispatch(fetchAllOrder({ currentPage: 1, itemsPerPage: 5 }))
}
