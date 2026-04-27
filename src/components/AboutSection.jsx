import { useRef, useState } from 'react'
import picsImage from '../assets/images/pics.jpg'
import secondImage from '../assets/images/Second.png'
import heroVideo from '../assets/videos/hero-video.mp4'
import { ArrowUpRightIcon } from './PremiumIcons'
import useParallax from '../hooks/useParallax'
import '../styles/sections.css'

const stats = [
  {
    value: '97',
    suffix: '%+',
    title: 'Guest Approval',
    text: 'A strong guest rating reflects the calm service, polished rooms, and careful hosting our team delivers daily.',
  },
  {
    value: '15',
    suffix: '+',
    title: 'Years Hosting',
    text: 'More than a decade of hospitality work helps each visit feel easy from arrival through departure.',
  },
  {
    value: '25k',
    suffix: '+',
    title: 'Stays Welcomed',
    text: 'Thousands of travelers have trusted the property for private escapes, family breaks, and quiet celebrations.',
  },
]

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M9 7.8v8.4c0 .78.86 1.25 1.52.83l6.35-4.2a1 1 0 0 0 0-1.66l-6.35-4.2A1 1 0 0 0 9 7.8Z" />
  </svg>
)

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8.5 6.5h2.2c.44 0 .8.36.8.8v9.4c0 .44-.36.8-.8.8H8.5a.8.8 0 0 1-.8-.8V7.3c0-.44.36-.8.8-.8Zm4.8 0h2.2c.44 0 .8.36.8.8v9.4c0 .44-.36.8-.8.8h-2.2a.8.8 0 0 1-.8-.8V7.3c0-.44.36-.8.8-.8Z" />
  </svg>
)

export default function AboutSection() {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPosterOverlay, setShowPosterOverlay] = useState(true)
  const introRef = useParallax({ y: -12, revealX: -120, revealY: 34, revealScale: -0.04, fade: true })
  const copyRef = useParallax({ y: 12, revealX: 120, revealY: 34, revealScale: -0.04, fade: true })
  const videoCardRef = useParallax({ y: 22, revealX: -150, revealY: 58, revealScale: -0.06, fade: true })
  const imageCardRef = useParallax({ y: -18, revealX: 150, revealY: 58, revealScale: -0.06, fade: true })
  const statOneRef = useParallax({ y: 10, revealX: 150, revealY: 52, revealScale: -0.05, fade: true })
  const statTwoRef = useParallax({ y: -8, revealY: 62, revealScale: -0.05, fade: true })
  const statThreeRef = useParallax({ y: 10, revealX: -150, revealY: 52, revealScale: -0.05, fade: true })
  const statRefs = [statOneRef, statTwoRef, statThreeRef]

  const toggleVideo = async () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      try {
        await video.play()
      } catch (error) {
        setIsPlaying(false)
        setShowPosterOverlay(true)
      }
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  return (
    <section className="about-overview" id="about">
      <div className="about-overview__container">
        <div className="about-overview__top">
          <div className="about-overview__intro parallax-layer" ref={introRef}>
            <p className="about-overview__label">
              <svg viewBox="0 0 48 24" aria-hidden="true">
                <path d="M6 12c5.5-6.8 13.2-6.8 18.7 0S37.9 18.8 43.4 12" />
                <path d="M6 12c5.5 6.8 13.2 6.8 18.7 0S37.9 5.2 43.4 12" />
                <circle cx="24" cy="12" r="3.5" />
              </svg>
              Our Place
            </p>

            <h2 className="about-overview__title">
              Welcome to Bodunde Vista, a peaceful address for quiet luxury
            </h2>

            <a href="#gallery" className="about-overview__button">
              See gallery
              <ArrowUpRightIcon />
            </a>
          </div>

          <div className="about-overview__copy parallax-layer" ref={copyRef}>
            <p>
              The villas pair modern comfort with generous natural views.
              <strong> Whether you are planning a romantic pause or a family retreat, the stay is shaped around attentive service, scenic corners, and personal care.</strong>
            </p>

            <p>
              Set close to soft beaches and green garden paths, every suite gives guests a private pocket of calm.
            </p>
          </div>
        </div>

        <div className="about-overview__media-grid">
          <div className="about-overview__media about-overview__media--video parallax-layer" ref={videoCardRef}>
            <video
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              poster={secondImage}
              onPlaying={() => {
                setIsPlaying(true)
                setShowPosterOverlay(false)
              }}
              onPause={(event) => {
                setIsPlaying(false)
                if (event.currentTarget.currentTime <= 0.1) {
                  setShowPosterOverlay(true)
                }
              }}
              onEnded={(event) => {
                event.currentTarget.currentTime = 0
                setIsPlaying(false)
                setShowPosterOverlay(true)
              }}
            >
              <source src={heroVideo} type="video/mp4" />
            </video>

            <div
              className={`about-overview__poster${
                showPosterOverlay ? '' : ' about-overview__poster--hidden'
              }`}
              aria-hidden="true"
            >
              <img src={secondImage} alt="" loading="eager" decoding="sync" />
            </div>

            <button className="about-overview__play" type="button" onClick={toggleVideo}>
              <span>{isPlaying ? <PauseIcon /> : <PlayIcon />}</span>
              {isPlaying ? 'Pause Tour' : 'Start Tour'}
            </button>
          </div>

          <div className="about-overview__media parallax-layer" ref={imageCardRef}>
            <img src={picsImage} alt="Private villa pool beside a planted garden" />
          </div>
        </div>

        <div className="about-overview__stats">
          {stats.map((item, index) => (
            <article
              className="about-overview__stat-card parallax-layer"
              key={item.title}
              ref={statRefs[index]}
            >
              <h3>
                {item.value}
                <span>{item.suffix}</span>
              </h3>

              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
