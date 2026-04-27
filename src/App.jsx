import { useEffect, useState } from 'react'
import './styles/global.css'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import VillaFeaturesSection from './components/VillaFeaturesSection'
import AmenitiesSection from './components/AmenitiesSection'
import RoomsSection from './components/RoomsSection'
import ReviewsSection from './components/ReviewsSection'
import VideoSection from './components/VideoSection'
import ArticlesSection from './components/ArticlesSection'
import FAQSection from './components/FAQSection'
import Footer from './components/Footer'
import BookingPage from './pages/BookingPage'

const HOME_PATH = '/'
const BOOKING_PATH = '/booking'

const COUNTRY_OPTIONS = [
  {
    code: 'NG',
    label: 'Nigeria',
    navLabel: 'Nigeria',
  },
  {
    code: 'US',
    label: 'United States',
    navLabel: 'United States',
  },
  {
    code: 'ZA',
    label: 'South Africa',
    navLabel: 'South Africa',
  },
  {
    code: 'GB',
    label: 'United Kingdom',
    navLabel: 'United Kingdom',
  },
  {
    code: 'FI',
    label: 'Finland',
    navLabel: 'Finland',
  },
  {
    code: 'AE',
    label: 'United Arab Emirates / Dubai',
    navLabel: 'UAE / Dubai',
  },
]

const DEFAULT_BOOKING_SEARCH = {
  destinationCode: COUNTRY_OPTIONS[0].code,
  checkIn: '',
  checkOut: '',
  guests: '2 Guests',
  roomType: 'Deluxe Room',
}

const normalizePath = (pathName) => {
  const cleanedPath = (pathName || HOME_PATH).replace(/\/+$/, '')
  return cleanedPath || HOME_PATH
}

const normalizeHash = (hashValue) => hashValue.replace(/^#/, '').trim()

const scrollToTarget = (sectionId) => {
  if (!sectionId) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return true
  }

  const section = document.getElementById(sectionId)

  if (!section) {
    return false
  }

  const topOffset = window.innerWidth <= 390 ? 78 : window.innerWidth <= 810 ? 84 : 94
  const sectionTop = section.getBoundingClientRect().top + window.scrollY - topOffset

  window.scrollTo({
    top: Math.max(sectionTop, 0),
    behavior: 'smooth',
  })

  return true
}

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_OPTIONS[0])
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname))
  const [pendingSection, setPendingSection] = useState(() => normalizeHash(window.location.hash))
  const [bookingSearch, setBookingSearch] = useState(DEFAULT_BOOKING_SEARCH)
  const [bookingSearchRevision, setBookingSearchRevision] = useState(0)

  const isBookingPage = currentPath === BOOKING_PATH

  useEffect(() => {
    const syncLocationState = () => {
      setCurrentPath(normalizePath(window.location.pathname))
      setPendingSection(normalizeHash(window.location.hash))
    }

    window.addEventListener('popstate', syncLocationState)

    return () => {
      window.removeEventListener('popstate', syncLocationState)
    }
  }, [])

  useEffect(() => {
    if (currentPath !== HOME_PATH) {
      return undefined
    }

    let attempts = 0
    let timeoutId = 0

    const applyScroll = () => {
      const didScroll = scrollToTarget(pendingSection)

      if (!didScroll && attempts < 8) {
        attempts += 1
        timeoutId = window.setTimeout(applyScroll, 90)
      }
    }

    timeoutId = window.setTimeout(applyScroll, 50)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [currentPath, pendingSection])

  const updateHistory = (path, section = '') => {
    const nextPath = normalizePath(path)
    const nextHash = section ? `#${section}` : ''
    const nextUrl = `${nextPath}${nextHash}`
    const currentUrl = `${normalizePath(window.location.pathname)}${window.location.hash}`

    if (currentUrl !== nextUrl) {
      window.history.pushState({}, '', nextUrl)
    }

    setCurrentPath(nextPath)
    setPendingSection(nextPath === HOME_PATH ? section : '')
  }

  const handleCountryChange = (country) => {
    setSelectedCountry(country)
  }

  const handleNavigate = ({ path = HOME_PATH, section = '' } = {}) => {
    const nextPath = normalizePath(path)

    if (nextPath === BOOKING_PATH) {
      updateHistory(BOOKING_PATH)

      window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 0)

      return
    }

    if (currentPath === HOME_PATH) {
      updateHistory(HOME_PATH, section)
      scrollToTarget(section)
      return
    }

    updateHistory(HOME_PATH, section)
  }

  const handleBookingSearch = (searchValues) => {
    setBookingSearch(searchValues)
    setBookingSearchRevision((currentRevision) => currentRevision + 1)

    if (currentPath !== BOOKING_PATH) {
      updateHistory(BOOKING_PATH)

      window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 0)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <Navbar
        countries={COUNTRY_OPTIONS}
        selectedCountry={selectedCountry}
        setSelectedCountry={handleCountryChange}
        onNavigate={handleNavigate}
      />

      <main>
        {isBookingPage ? (
          <BookingPage
            countries={COUNTRY_OPTIONS}
            selectedCountry={selectedCountry}
            initialSearch={bookingSearch}
            searchRevision={bookingSearchRevision}
            onSearch={handleBookingSearch}
          />
        ) : (
          <>
            <Hero
              countries={COUNTRY_OPTIONS}
              initialSearch={bookingSearch}
              onSearch={handleBookingSearch}
            />
            <AboutSection />
            <VillaFeaturesSection />
            <AmenitiesSection />
            <RoomsSection selectedCountry={selectedCountry} />
            <ReviewsSection />
            <VideoSection />
            <ArticlesSection />
            <FAQSection />
          </>
        )}
      </main>

      <Footer />
    </>
  )
}
