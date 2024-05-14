// import video from "../assets/video.mov";
import image from "../assets/image/im1.png"
import image2 from "../assets/image/im2.png"

export const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-text">
        <h1>Shine with us</h1>
        <p>From Classic to Contemporary: Find the Watch That Reflects Your Style!</p>
        <button className="btn">Shop Now</button>
      </div>
      <div className="hero-images">
        <img src={image2} className="front-image" />
        <img src={image} className="back-image" />
      </div>
    </section>
  )
}
