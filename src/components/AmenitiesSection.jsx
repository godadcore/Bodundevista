import arrivalShuttleImage from '../assets/images/Arrival Shuttle.jpg'
import fastInternetImage from '../assets/images/Fast Internet.jpg'
import livingRoomImage from '../assets/images/living-room.jpg'
import morningBreakfastImage from '../assets/images/Morning Breakfast.jpg'
import secureParkingImage from '../assets/images/Secure Parking.jpg'
import villaPoolImage from '../assets/images/villa-pool.jpg'
import { ArrowUpRightIcon } from './PremiumIcons'
import useParallax from '../hooks/useParallax'
import '../styles/sections.css'

const amenities = [
  {
    title: 'Arrival Shuttle',
    desc: 'Smooth transfers arranged for check-in and departure.',
    image: arrivalShuttleImage,
  },
  {
    title: 'Fast Internet',
    desc: 'Reliable wireless access for streaming, work, and planning.',
    image: fastInternetImage,
  },
  {
    title: 'Morning Breakfast',
    desc: 'Fresh breakfast options prepared to begin the day well.',
    image: morningBreakfastImage,
  },
  {
    title: 'Secure Parking',
    desc: 'Convenient on-site parking for guests traveling by car.',
    image: secureParkingImage,
  },
]

const SectionIcon = () => (
  <svg viewBox="0 0 48 24" aria-hidden="true">
    <path d="M6 12c5.5-6.8 13.2-6.8 18.7 0S37.9 18.8 43.4 12" />
    <path d="M6 12c5.5 6.8 13.2 6.8 18.7 0S37.9 5.2 43.4 12" />
    <circle cx="24" cy="12" r="3.5" />
  </svg>
)

export default function AmenitiesSection() {
  const amenityOneRef = useParallax({ y: 8, revealX: 330, revealY: -58, revealScale: -0.09, fade: true, mobileFactor: 0.28 })
  const amenityTwoRef = useParallax({ y: -8, revealX: 110, revealY: -58, revealScale: -0.09, fade: true, mobileFactor: 0.28 })
  const amenityThreeRef = useParallax({ y: -8, revealX: -110, revealY: -58, revealScale: -0.09, fade: true, mobileFactor: 0.28 })
  const amenityFourRef = useParallax({ y: 8, revealX: -330, revealY: -58, revealScale: -0.09, fade: true, mobileFactor: 0.28 })
  const amenityRefs = [amenityOneRef, amenityTwoRef, amenityThreeRef, amenityFourRef]
  const storyImageRef = useParallax({ y: 22, revealX: -135, revealY: 56, revealScale: -0.06, fade: true })
  const storyTextRef = useParallax({ y: -12, revealX: 135, revealY: 48, revealScale: -0.05, fade: true })
  const historyTextRef = useParallax({ y: 12, revealX: -135, revealY: 48, revealScale: -0.05, fade: true })
  const historyImageRef = useParallax({ y: -22, revealX: 135, revealY: 56, revealScale: -0.06, fade: true })

  return (
    <section className="amenities-section" id="amenities">
      <div className="amenities-section__container">
        <div className="amenities-section__header">
          <p className="amenities-section__label">
            <SectionIcon />
            Amenities
            <SectionIcon />
          </p>

          <h2 className="amenities-section__title">Villa essentials at a glance</h2>
        </div>

        <div className="amenities-grid">
          {amenities.map((item, index) => (
            <article className="amenity-card parallax-layer" key={item.title} ref={amenityRefs[index]}>
              <div className="amenity-card__image">
                <img src={item.image} alt={item.title} />
              </div>

              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>

        <a href="#rooms" className="amenities-section__button">
          View every service
          <ArrowUpRightIcon />
        </a>

        <div className="villa-story">
          <div className="villa-story__image parallax-layer" ref={storyImageRef}>
            <img src={villaPoolImage} alt="Villa pool surrounded by garden plants" />
          </div>

          <div className="villa-story__content parallax-layer" ref={storyTextRef}>
            <p className="amenities-section__label amenities-section__label--left">
              <SectionIcon />
              The Vision
            </p>

            <h2 className="villa-story__title">
              A peaceful hideaway <br />
              where comfort meets the landscape
            </h2>

            <p>
              The property blends present-day ease with the quiet beauty of its setting.
              Guests can unwind as couples, families, or small groups while the team
              handles details with calm, personal attention.
            </p>

            <p>
              Garden paths, private corners, and sunlit gathering areas make each visit
              feel unhurried. From morning stretches to candlelit meals, the day is built
              around moments that linger.
            </p>

            <a href="#about" className="villa-story__button">
              Learn more
              <ArrowUpRightIcon />
            </a>
          </div>
        </div>

        <div className="villa-history">
          <div className="villa-history__content parallax-layer" ref={historyTextRef}>
            <p className="amenities-section__label amenities-section__label--left">
              <SectionIcon />
              The Setting
            </p>

            <h2 className="villa-history__title">
              Shaped by nature <br />
              and refined with care
            </h2>

            <p>
              Bodunde Vista was planned as a slower, softer alternative to crowded stays.
              Its rooms, outdoor areas, and service rhythm are arranged to make privacy
              feel effortless.
            </p>

            <p>
              Natural materials, greenery, and generous proportions give the villa its
              calm identity, while thoughtful amenities keep the experience practical
              from morning to night.
            </p>

            <a href="#features" className="villa-history__button">
              Explore details
              <ArrowUpRightIcon />
            </a>
          </div>

          <div className="villa-history__image parallax-layer" ref={historyImageRef}>
            <img src={livingRoomImage} alt="Comfortable living room with natural light" />
          </div>
        </div>
      </div>
    </section>
  )
}
