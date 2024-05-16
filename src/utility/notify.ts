import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const successMessage = (text: string) => {
  toast.success(text)
}

export const errorMessage = (text: string) => {
  toast.error(text)
}
