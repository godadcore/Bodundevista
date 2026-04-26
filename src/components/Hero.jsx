import heroPoster from '../assets/images/hero-image.jpg'
import heroVideo from '../assets/videos/hero-video.mp4'
import useParallax from '../hooks/useParallax'
import '../styles/hero.css'

export default function Hero() {
  const mediaRef = useParallax(32)

  return (
    <section className="hero" id="home" aria-label="Bodunde Vista welcome">
      <div className="hero__media parallax-layer" ref={mediaRef} aria-hidden="true">
        <video autoPlay muted loop playsInline poster={heroPoster}>
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>

      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__brand-wrap">
        <h1 className="hero__brand">Bodunde Vista</h1>
      </div>
    </section>
  )
}
