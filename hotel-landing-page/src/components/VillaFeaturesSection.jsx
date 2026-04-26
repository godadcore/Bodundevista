import villaPoolImage from '../assets/images/villa-pool.jpg'
import useParallax from '../hooks/useParallax'
import '../styles/sections.css'

const features = [
  {
    title: 'Private pool and garden',
    text: 'Settle into a secluded pool area framed by trimmed greenery and open-air lounging space.',
  },
  {
    title: 'Curated interior comfort',
    text: 'Move through warm rooms finished with refined details, soft textures, and quality furniture.',
  },
  {
    title: 'Open living spaces',
    text: 'Gather easily in bright shared areas designed for conversation, meals, and relaxed evenings.',
  },
  {
    title: 'Outdoor hosting corner',
    text: 'Enjoy slow nights outside with comfortable seating, fresh air, and room for small celebrations.',
  },
]

export default function VillaFeaturesSection() {
  const backgroundRef = useParallax({ y: 42 })
  const titleRef = useParallax({ y: -8, revealY: 76, revealScale: -0.05, fade: true })
  const cardOneRef = useParallax({ y: 9, revealX: 360, revealY: -64, revealScale: -0.1, fade: true })
  const cardTwoRef = useParallax({ y: -7, revealX: 120, revealY: -60, revealScale: -0.1, fade: true })
  const cardThreeRef = useParallax({ y: -7, revealX: -120, revealY: -60, revealScale: -0.1, fade: true })
  const cardFourRef = useParallax({ y: 9, revealX: -360, revealY: -64, revealScale: -0.1, fade: true })
  const cardRefs = [cardOneRef, cardTwoRef, cardThreeRef, cardFourRef]

  return (
    <section className="villa-features" id="features">
      <div className="villa-features__bg parallax-layer" ref={backgroundRef} aria-hidden="true">
        <img src={villaPoolImage} alt="" />
      </div>

      <div className="villa-features__overlay" aria-hidden="true" />

      <div className="villa-features__content">
        <h2 className="villa-features__title parallax-layer" ref={titleRef}>
          Explore the thoughtful details <br />
          that make every villa stay memorable
        </h2>

        <div className="villa-features__grid">
          {features.map((feature, index) => (
            <article className="villa-features__card parallax-layer" key={feature.title} ref={cardRefs[index]}>
              <span className="villa-features__line" />
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
