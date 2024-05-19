import { Header } from "@/components/Header"
import { Products } from "./Product"
import { Footer } from "@/components/Footer"
import { HeroSection } from "@/components/HeroSection"
import { CategoryCard } from "../components/Category"

export const Home = () => {
  return (
    <>
      <Header />
      <main className="container">
        <HeroSection />
        <CategoryCard />
        <Products />
      </main>
      <Footer />
    </>
  )
}
