import { useEffect, useRef, useState } from 'react'
import bathroomImage from '../assets/images/bathroom.jpg'
import bedroomImage from '../assets/images/bedroom.jpg'
import kitchenImage from '../assets/images/kitchen.jpg'
import livingRoomImage from '../assets/images/living-room.jpg'
import lobbyImage from '../assets/images/lobby.jpg'
import { ArrowLeftIcon, ArrowRightIcon } from './PremiumIcons'
import useParallax from '../hooks/useParallax'
import '../styles/sections.css'

const rooms = [
  {
    title: 'Garden Lounge',
    image: livingRoomImage,
    size: '55 sq m',
    guests: '3 adults, 1 child',
    priceUsd: 299,
  },
  {
    title: 'Grand Lobby',
    image: lobbyImage,
    size: '70 sq m',
    guests: '4 adults, 2 children',
    priceUsd: 349,
  },
  {
    title: 'Chef Kitchen',
    image: kitchenImage,
    size: '42 sq m',
    guests: '2 adults, 1 child',
    priceUsd: 199,
  },
  {
    title: 'Spa Bathroom',
    image: bathroomImage,
    size: '28 sq m',
    guests: '2 adults',
    priceUsd: 149,
  },
  {
    title: 'Serene Bedroom',
    image: bedroomImage,
    size: '60 sq m',
    guests: '3 adults',
    priceUsd: 329,
  },
]

const currencyByCountry = {
  NG: {
    label: 'NGN ',
    rate: 1500,
    decimals: 0,
  },
  US: {
    label: 'USD ',
    rate: 1,
    decimals: 0,
  },
  ZA: {
    label: 'ZAR ',
    rate: 18,
    decimals: 0,
  },
  GB: {
    label: 'GBP ',
    rate: 0.79,
    decimals: 0,
  },
  FI: {
    label: 'EUR ',
    rate: 0.92,
    decimals: 0,
  },
  AE: {
    label: 'AED ',
    rate: 3.67,
    decimals: 0,
  },
}

const serviceNotes = [
  {
    title: 'Attentive Service',
    text: 'Responsive hosting that notices the small details before they become requests.',
  },
  {
    title: 'Connected Location',
    text: 'A convenient setting for dining, coastlines, shopping, and local discoveries.',
  },
  {
    title: 'Trusted Standard',
    text: 'Consistent care, polished spaces, and a stay experience guests remember.',
  },
  {
    title: 'Calm Design Language',
    text: 'Soft interiors, balanced textures, and restful lighting throughout the property.',
  },
  {
    title: 'Tailored Moments',
    text: 'Curated add-ons and private experiences shaped around your plans.',
  },
]

const SectionIcon = () => (
  <svg viewBox="0 0 48 24" aria-hidden="true">
    <path d="M6 12c5.5-6.8 13.2-6.8 18.7 0S37.9 18.8 43.4 12" />
    <path d="M6 12c5.5 6.8 13.2 6.8 18.7 0S37.9 5.2 43.4 12" />
    <circle cx="24" cy="12" r="3.5" />
  </svg>
)

export default function RoomsSection({ selectedCountry }) {
  const [active, setActive] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef(0)
  const roomImageRef = useParallax({ y: 32 })
  const roomContentRef = useParallax({ y: -12, revealY: 64, revealScale: -0.05, fade: true })
  const promiseLargeRef = useParallax({ y: 18, revealX: -120, revealY: 52, revealScale: -0.06, fade: true })
  const promiseSmallRef = useParallax({ y: -24, revealX: 90, revealY: -42, revealScale: -0.05, fade: true })
  const promiseContentRef = useParallax({ y: -10, revealX: 130, revealY: 48, revealScale: -0.05, fade: true })

  const activeRoom = rooms[active]
  const activeCurrency = currencyByCountry[selectedCountry?.code] || currencyByCountry.NG

  const formatPrice = (usd) => {
    const convertedAmount = usd * activeCurrency.rate

    const formattedAmount = convertedAmount.toLocaleString(undefined, {
      maximumFractionDigits: activeCurrency.decimals,
      minimumFractionDigits: activeCurrency.decimals,
    })

    return `${activeCurrency.label}${formattedAmount}`
  }

  const nextRoom = () => {
    setActive((current) => (current + 1) % rooms.length)
  }

  const prevRoom = () => {
    setActive((current) => (current - 1 + rooms.length) % rooms.length)
  }

  useEffect(() => {
    const id = setInterval(() => {
      nextRoom()
    }, 5500)

    return () => clearInterval(id)
  }, [])

  const handleDragStart = (event) => {
    setIsDragging(true)
    startX.current = event.clientX || event.touches?.[0]?.clientX || 0
  }

  const handleDragEnd = (event) => {
    if (!isDragging) return

    const endX = event.clientX || event.changedTouches?.[0]?.clientX || 0
    const difference = startX.current - endX

    if (difference > 60) nextRoom()
    if (difference < -60) prevRoom()

    setIsDragging(false)
  }

  return (
    <section className="section rooms-section" id="rooms" aria-label="Rooms and stay options">
      <div
        className="room-showcase"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        <div className="room-showcase__image parallax-layer" ref={roomImageRef}>
          <img src={activeRoom.image} alt={activeRoom.title} />
        </div>

        <div className="room-showcase__overlay" aria-hidden="true" />

        <button
          className="room-showcase__arrow room-showcase__arrow--left"
          type="button"
          onClick={prevRoom}
          aria-label="Previous room"
        >
          <ArrowLeftIcon />
        </button>

        <button
          className="room-showcase__arrow room-showcase__arrow--right"
          type="button"
          onClick={nextRoom}
          aria-label="Next room"
        >
          <ArrowRightIcon />
        </button>

        <div className="room-showcase__content parallax-layer" ref={roomContentRef}>
          <h2>{activeRoom.title}</h2>

          <div className="room-showcase__meta">
            <span>{activeRoom.size}</span>
            <span>/</span>
            <span>{activeRoom.guests}</span>
            <span>/</span>
            <span>Starts at</span>
            <strong>{formatPrice(activeRoom.priceUsd)}</strong>
          </div>
        </div>
      </div>

      <div className="service-promise">
        <div className="service-promise__visual">
          <img
            className="service-promise__image service-promise__image--large parallax-layer"
            ref={promiseLargeRef}
            src={lobbyImage}
            alt="Bright lobby seating area"
          />
          <img
            className="service-promise__image service-promise__image--small parallax-layer"
            ref={promiseSmallRef}
            src={bedroomImage}
            alt="Quiet bedroom interior"
          />
        </div>

        <div className="service-promise__content parallax-layer" ref={promiseContentRef}>
          <p className="service-promise__label">
            <SectionIcon />
            Why Stay With Us
          </p>

          <h2 className="service-promise__title">
            A hotel promise shaped <br />
            by quiet excellence
          </h2>

          <p className="service-promise__intro">
            Staying with Bodunde Vista means choosing a measured, personal experience
            with thoughtful comforts built into every day.
          </p>

          <div className="service-promise__grid">
            {serviceNotes.map((item) => (
              <article className="service-promise__item" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
