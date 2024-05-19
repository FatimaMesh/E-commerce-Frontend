import { createContext, useContext } from "react"

// Context state
interface PageContextType {
  openPage: string
  setOpenPage: (page: string) => void
}

// Create the context with a default value
export const PageContext = createContext<PageContextType>({
  openPage: "shop",
  setOpenPage: () => console.warn("setOpenPage method not implemented yet")
})

// Custom hook to use the PageContext
export const usePage = (): PageContextType => useContext(PageContext)
