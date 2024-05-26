import delivery from "../assets/image/delivery.png"
import quality from "../assets/image/quality.png"
import support from "../assets/image/support.png"
import "../style/features.css"

const ShopFeatures = () => {
  return (
    <section className="shop-features">
      <article>
        <img src={delivery} alt="Fast & Free Delivery" />
        <div>
          <h3>Fast & Free</h3>
          <p>Your products come fast within 6 days</p>
        </div>
      </article>
      <article>
        <img src={support} alt="24 Support" />
        <div>
          <h3>24/7 Support</h3>
          <p>We are here to help you anytime</p>
        </div>
      </article>
      <article>
        <img src={quality} alt="Good Quality" />
        <div>
          <h3>Good Quality</h3>
          <p>Products made with unique materials</p>
        </div>
      </article>
    </section>
  )
}

export default ShopFeatures
