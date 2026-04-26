import { useEffect, useRef, useState } from 'react'
import logoUrl from '../assets/icons/logo.svg'
import { ArrowUpRightIcon, ChevronDownIcon } from './PremiumIcons'
import '../styles/navbar.css'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Highlights', href: '#features' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Rooms', href: '#rooms' },
]

const FlagIcon = ({ code }) => (
  <svg className="navbar__flag" viewBox="0 0 36 24" aria-hidden="true">
    {code === 'NG' && (
      <>
        <rect width="12" height="24" fill="#008751" />
        <rect x="12" width="12" height="24" fill="#fff" />
        <rect x="24" width="12" height="24" fill="#008751" />
      </>
    )}

    {code === 'US' && (
      <>
        <rect width="36" height="24" fill="#b22234" />
        {[2, 6, 10, 14, 18, 22].map((y) => (
          <rect key={y} y={y} width="36" height="2" fill="#fff" />
        ))}
        <rect width="15.5" height="13" fill="#3c3b6e" />
      </>
    )}

    {code === 'ZA' && (
      <>
        <rect width="36" height="24" fill="#de3831" />
        <rect y="12" width="36" height="12" fill="#002395" />
        <path d="M0 0l18 12L0 24z" fill="#000" />
        <path d="M0 0l19 12L0 24" stroke="#ffb612" strokeWidth="4" fill="none" />
        <path d="M0 0l18 12L0 24" stroke="#007a4d" strokeWidth="2.4" fill="none" />
        <path d="M18 12H36" stroke="#fff" strokeWidth="4" />
        <path d="M18 12H36" stroke="#007a4d" strokeWidth="2.4" />
      </>
    )}

    {code === 'GB' && (
      <>
        <rect width="36" height="24" fill="#012169" />
        <path d="M0 0l36 24M36 0L0 24" stroke="#fff" strokeWidth="5" />
        <path d="M0 0l36 24M36 0L0 24" stroke="#c8102e" strokeWidth="2.4" />
        <path d="M18 0v24M0 12h36" stroke="#fff" strokeWidth="8" />
        <path d="M18 0v24M0 12h36" stroke="#c8102e" strokeWidth="4.4" />
      </>
    )}

    {code === 'FI' && (
      <>
        <rect width="36" height="24" fill="#fff" />
        <rect x="10" width="5" height="24" fill="#002f6c" />
        <rect y="9" width="36" height="5" fill="#002f6c" />
      </>
    )}

    {code === 'AE' && (
      <>
        <rect width="9" height="24" fill="#ff0000" />
        <rect x="9" width="27" height="8" fill="#00732f" />
        <rect x="9" y="8" width="27" height="8" fill="#fff" />
        <rect x="9" y="16" width="27" height="8" fill="#000" />
      </>
    )}
  </svg>
)

const COUNTRIES = [
  { code: 'NG', label: 'Nigeria' },
  { code: 'US', label: 'United States' },
  { code: 'ZA', label: 'South Africa' },
  { code: 'GB', label: 'United Kingdom' },
  { code: 'FI', label: 'Finland' },
  { code: 'AE', label: 'United Arab Emirates' },
]

export default function Navbar({ selectedCountry, setSelectedCountry }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [countryOpen, setCountryOpen] = useState(false)
  const countryRef = useRef(null)

  const activeCountry = selectedCountry || COUNTRIES[0]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 45)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const closeDropdown = (event) => {
      if (countryRef.current && !countryRef.current.contains(event.target)) {
        setCountryOpen(false)
      }
    }

    document.addEventListener('mousedown', closeDropdown)
    document.addEventListener('touchstart', closeDropdown)

    return () => {
      document.removeEventListener('mousedown', closeDropdown)
      document.removeEventListener('touchstart', closeDropdown)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen])

  return (
    <>
      <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          <ul className="navbar__links" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="navbar__link">
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#home" className="navbar__logo" aria-label="Bodunde Vista home">
            <img className="navbar__logo-mark" src={logoUrl} alt="" />
          </a>

          <div className="navbar__actions">
            <div className="navbar__country-wrap" ref={countryRef}>
              <button
                type="button"
                className={`navbar__country${countryOpen ? ' navbar__country--open' : ''}`}
                onClick={() => setCountryOpen((open) => !open)}
                aria-expanded={countryOpen}
                aria-haspopup="listbox"
              >
                <FlagIcon code={activeCountry.code} />
                <span>{activeCountry.label}</span>
                <ChevronDownIcon className="navbar__country-arrow" />
              </button>

              {countryOpen && (
                <div className="navbar__country-menu" role="listbox">
                  {COUNTRIES.map((country) => (
                    <button
                      type="button"
                      key={country.code}
                      className={`navbar__country-option ${
                        activeCountry.code === country.code ? 'navbar__country-option--active' : ''
                      }`}
                      role="option"
                      aria-selected={activeCountry.code === country.code}
                      onClick={() => {
                        setSelectedCountry(country)
                        setCountryOpen(false)
                      }}
                    >
                      <FlagIcon code={country.code} />
                      <span>{country.label}</span>
                      <span className="navbar__country-check" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a href="#contact" className="navbar__book">
              Book Now <ArrowUpRightIcon />
            </a>

            <button
              className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              type="button"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`navbar__mobile${menuOpen ? ' navbar__mobile--open' : ''}`}
        onClick={() => setMenuOpen(false)}
      >
        <div className="navbar__mobile-panel" onClick={(event) => event.stopPropagation()}>
          <div className="navbar__mobile-top">
            <a href="#home" className="navbar__mobile-brand" onClick={() => setMenuOpen(false)}>
              <img src={logoUrl} alt="" />
              <span>Bodunde Vista</span>
            </a>

            <button
              type="button"
              className="navbar__mobile-close"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <span />
              <span />
            </button>
          </div>

          <div className="navbar__mobile-menu">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href} className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </div>

          <a href="#contact" className="navbar__mobile-cta" onClick={() => setMenuOpen(false)}>
            Book Now <ArrowUpRightIcon />
          </a>

          <div className="navbar__mobile-country-block">
            <p>Country</p>
            <div className="navbar__mobile-countries">
              {COUNTRIES.map((country) => (
                <button
                  type="button"
                  key={country.code}
                  className={`navbar__mobile-country ${
                    activeCountry.code === country.code ? 'navbar__mobile-country--active' : ''
                  }`}
                  onClick={() => {
                    setSelectedCountry(country)
                    setMenuOpen(false)
                  }}
                >
                  <FlagIcon code={country.code} />
                  <span>{country.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
