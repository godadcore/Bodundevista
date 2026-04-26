import { useEffect, useState } from 'react'
import bathroomImage from '../assets/images/bathroom.jpg'
import bedroomImage from '../assets/images/bedroom.jpg'
import livingRoomImage from '../assets/images/living-room.jpg'
import lobbyImage from '../assets/images/lobby.jpg'
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, StarIcon } from './PremiumIcons'
import useParallax from '../hooks/useParallax'
import '../styles/sections.css'

const REVIEWS = [
  {
    name: 'Mara Wells',
    role: 'Operations Lead',
    image: lobbyImage,
    text: 'The villa felt serene, polished, and carefully arranged. Each touchpoint, from arrival to room setup, felt considered.',
    rating: 4,
  },
  {
    name: 'Sofia Lane',
    role: 'Travel Advisor',
    image: bedroomImage,
    text: 'A restful luxury break with outstanding comfort. The atmosphere, design, and care made the whole visit stand out.',
    rating: 5,
  },
  {
    name: 'Daniel Hart',
    role: 'Studio Director',
    image: livingRoomImage,
    text: 'The property balanced elegance with ease. It was bright, composed, and ideal for both unwinding and fresh ideas.',
    rating: 5,
  },
  {
    name: 'Amara Vale',
    role: 'Founder',
    image: bathroomImage,
    text: 'Everything moved smoothly from check-in to farewell. The rooms, mood, and staff made the stay feel genuinely special.',
    rating: 4,
  },
]

const SectionIcon = () => (
  <svg viewBox="0 0 48 24" aria-hidden="true">
    <path d="M6 12c5.5-6.8 13.2-6.8 18.7 0S37.9 18.8 43.4 12" />
    <path d="M6 12c5.5 6.8 13.2 6.8 18.7 0S37.9 5.2 43.4 12" />
    <circle cx="24" cy="12" r="3.5" />
  </svg>
)

export default function ReviewsSection() {
  const [activeReview, setActiveReview] = useState(0)
  const imageRef = useParallax({ y: 14, revealX: -110, revealY: 42, revealScale: -0.05, fade: true })
  const cardRef = useParallax({ y: -10, revealX: 110, revealY: 42, revealScale: -0.05, fade: true })

  useEffect(() => {
    const id = setInterval(() => {
      setActiveReview((current) => (current + 1) % REVIEWS.length)
    }, 5500)

    return () => clearInterval(id)
  }, [])

  const review = REVIEWS[activeReview]

  const nextReview = () => {
    setActiveReview((current) => (current + 1) % REVIEWS.length)
  }

  const prevReview = () => {
    setActiveReview((current) => (current - 1 + REVIEWS.length) % REVIEWS.length)
  }

  return (
    <section className="review-section" id="reviews">
      <div className="review-section__container">
        <div className="review-section__top">
          <div>
            <p className="review-section__label">
              <SectionIcon />
              Guest Notes
              <SectionIcon />
            </p>

            <h2 className="review-section__title">
              Kind words from recent guests
            </h2>
          </div>

          <a href="#contact" className="review-section__button">
            Browse reviews
            <ArrowUpRightIcon />
          </a>
        </div>

        <div className="review-section__body">
          <div className="review-section__image parallax-layer" ref={imageRef}>
            <img src={review.image} alt={review.name} />
          </div>

          <article className="review-card parallax-layer" ref={cardRef}>
            <div className="review-card__stars" aria-label={`${review.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon
                  key={index}
                  className={`review-card__star ${index < review.rating ? 'review-card__star--active' : ''}`}
                />
              ))}
            </div>

            <p className="review-card__text">{review.text}</p>

            <div className="review-card__footer">
              <div className="review-card__author">
                <img src={review.image} alt={review.name} />
                <div>
                  <h3>{review.name}</h3>
                  <p>{review.role}</p>
                </div>
              </div>

              <div className="review-card__arrows">
                <button type="button" onClick={prevReview} aria-label="Previous review">
                  <ArrowLeftIcon />
                </button>
                <button type="button" onClick={nextReview} aria-label="Next review">
                  <ArrowRightIcon />
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
