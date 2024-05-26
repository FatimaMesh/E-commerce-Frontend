import { Header } from "@/components/Header"
import { Products } from "./Product"
import { Footer } from "@/components/Footer"
import { HeroSection } from "@/components/HeroSection"
import { CategoryCard } from "../components/Category"
import ShopFeatures from "@/components/FeaturesShop"

export const Home = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <main className="main-container">
        <CategoryCard />
        <Products />
        <ShopFeatures/>
      </main>
      <Footer />
    </>
  )
}
