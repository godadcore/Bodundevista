import bathroomImage from '../assets/images/bathroom.jpg'
import bedroomImage from '../assets/images/bedroom.jpg'
import livingRoomImage from '../assets/images/living-room.jpg'
import lobbyImage from '../assets/images/lobby.jpg'
import villaPoolImage from '../assets/images/villa-pool.jpg'
import { useState } from 'react'
import { MinusIcon, PlusIcon } from './PremiumIcons'
import useParallax from '../hooks/useParallax'
import '../styles/sections.css'

const FAQS = [
  {
    q: 'How do I book a stay?',
    a: 'Submit a booking request with your email or WhatsApp number. Our concierge team will confirm availability, payment, and reservation details before your stay is reserved.',
  },
  {
    q: 'Can the kitchen support special diets?',
    a: 'Yes. Share your food needs before arrival so breakfast, dining, and private meals can be planned with care.',
  },
  {
    q: 'What should guests wear on the property?',
    a: 'Relaxed resort clothing works well throughout the villa. Smart casual outfits are ideal for dining areas.',
  },
  {
    q: 'Is the villa family friendly?',
    a: 'Yes. Children are welcome, and the property includes comfortable shared spaces for families to settle in easily.',
  },
  {
    q: 'Can we arrange private dining?',
    a: 'Private meals can be prepared for couples, families, and special occasions with advance notice.',
  },
]

const GALLERY_IMAGES = [
  lobbyImage,
  bedroomImage,
  livingRoomImage,
  bathroomImage,
  villaPoolImage,
]

const SectionIcon = () => (
  <svg viewBox="0 0 48 24" aria-hidden="true">
    <path d="M6 12c5.5-6.8 13.2-6.8 18.7 0S37.9 18.8 43.4 12" />
    <path d="M6 12c5.5 6.8 13.2 6.8 18.7 0S37.9 5.2 43.4 12" />
    <circle cx="24" cy="12" r="3.5" />
  </svg>
)

export default function FAQSection() {
  const [open, setOpen] = useState(0)
  const leftRef = useParallax({ y: -10, revealX: -100, revealY: 38, revealScale: -0.04, fade: true })
  const rightRef = useParallax({ y: 10, revealX: 100, revealY: 38, revealScale: -0.04, fade: true })
  const galleryOneRef = useParallax({ y: 8, revealX: 180, revealY: 42, revealScale: -0.06, fade: true, mobileFactor: 0.25 })
  const galleryTwoRef = useParallax({ y: -8, revealX: 90, revealY: 42, revealScale: -0.06, fade: true, mobileFactor: 0.25 })
  const galleryThreeRef = useParallax({ y: 8, revealY: 52, revealScale: -0.06, fade: true })
  const galleryFourRef = useParallax({ y: -8, revealX: -90, revealY: 42, revealScale: -0.06, fade: true, mobileFactor: 0.25 })
  const galleryFiveRef = useParallax({ y: 8, revealX: -180, revealY: 42, revealScale: -0.06, fade: true, mobileFactor: 0.25 })
  const galleryRefs = [galleryOneRef, galleryTwoRef, galleryThreeRef, galleryFourRef, galleryFiveRef]

  const toggle = (i) => {
    setOpen(open === i ? null : i)
  }

  return (
    <section className="faq-section" id="faq" aria-label="Frequently asked questions">
      <div className="faq-section__container">
        <div className="faq-section__left parallax-layer" ref={leftRef}>
          <p className="faq-section__label">
            <SectionIcon />
            Common Questions
            <SectionIcon />
          </p>

          <h2 className="faq-section__title">
            Answers for planning <br />
            your stay
          </h2>
        </div>

        <div className="faq-section__right parallax-layer" ref={rightRef}>
          {FAQS.map((item, index) => (
            <div className={`faq-row ${open === index ? 'faq-row--open' : ''}`} key={`${item.q}-${index}`}>
              <button type="button" className="faq-row__question" onClick={() => toggle(index)}>
                <span>{item.q}</span>
                <span className="faq-row__icon">{open === index ? <MinusIcon /> : <PlusIcon />}</span>
              </button>

              {open === index && (
                <p className="faq-row__answer">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="faq-gallery" id="gallery">
        {GALLERY_IMAGES.map((image, index) => (
          <div className="faq-gallery__item parallax-layer" key={image} ref={galleryRefs[index]}>
            <img src={image} alt={`Villa gallery ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  )
}
