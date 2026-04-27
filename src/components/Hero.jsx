import { useEffect, useRef, useState } from 'react'
import heroVideo from '../assets/videos/hero-video.mp4'
import { ArrowUpRightIcon, ChevronDownIcon } from './PremiumIcons'
import useParallax from '../hooks/useParallax'
import '../styles/hero.css'

const guestOptions = [
  '1 Guest',
  '2 Guests',
  '3 Guests',
  '4 Guests',
  '5 Guests',
  '6+ Guests',
]

const roomTypes = [
  'Standard Room',
  'Deluxe Room',
  'Executive Suite',
  'Family Villa',
  'Luxury Penthouse',
]

const buildSearchState = (initialSearch, countries) => ({
  destinationCode: initialSearch?.destinationCode || countries[0].code,
  checkIn: initialSearch?.checkIn || '',
  checkOut: initialSearch?.checkOut || '',
  guests: initialSearch?.guests || '2 Guests',
  roomType: initialSearch?.roomType || 'Deluxe Room',
})

const CalendarIcon = ({ className = 'hero-search__icon' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7 3v4" />
    <path d="M17 3v4" />
    <rect x="4" y="6" width="16" height="15" rx="3" />
    <path d="M4 11h16" />
  </svg>
)

const MapPinIcon = ({ className = 'hero-search__icon' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 21s7-5.4 7-11a7 7 0 0 0-14 0c0 5.6 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)

const UsersIcon = ({ className = 'hero-search__icon' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M16 19c0-2.2-1.8-4-4-4H8c-2.2 0-4 1.8-4 4" />
    <circle cx="10" cy="8" r="4" />
    <path d="M21 19c0-2-1.4-3.6-3.3-3.9" />
    <path d="M16.8 4.2a3.2 3.2 0 0 1 0 6.1" />
  </svg>
)

const RoomIcon = ({ className = 'hero-search__icon' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 11V6.8C4 5.2 5.2 4 6.8 4h10.4C18.8 4 20 5.2 20 6.8V11" />
    <path d="M4 20v-6h16v6" />
    <path d="M7 14v-2.5c0-.8.7-1.5 1.5-1.5h7c.8 0 1.5.7 1.5 1.5V14" />
    <path d="M4 17h16" />
  </svg>
)

const FlagIcon = ({ code }) => (
  <svg className="hero-search__flag" viewBox="0 0 36 24" aria-hidden="true">
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

const SearchSelectField = ({
  label,
  icon,
  value,
  isOpen,
  onToggle,
  options,
  onSelect,
  renderValue,
  renderOption,
  fieldClassName = '',
}) => (
  <div
    className={`hero-search__field${isOpen ? ' hero-search__field--open' : ''}${
      fieldClassName ? ` ${fieldClassName}` : ''
    }`}
  >
    <span className="hero-search__label">
      {icon}
      {label}
    </span>

    <button
      type="button"
      className={`hero-search__select${isOpen ? ' hero-search__select--open' : ''}`}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      onClick={onToggle}
    >
      <span className="hero-search__select-value">{renderValue(value)}</span>
      <ChevronDownIcon className="hero-search__select-arrow" />
    </button>

    {isOpen && (
      <div className="hero-search__panel" role="listbox">
        {options.map((option) => {
          const optionValue = typeof option === 'string' ? option : option.code
          const selected = optionValue === value

          return (
            <button
              type="button"
              key={optionValue}
              className={`hero-search__option${selected ? ' hero-search__option--active' : ''}`}
              role="option"
              aria-selected={selected}
              onClick={() => onSelect(optionValue)}
            >
              <span className="hero-search__option-content">{renderOption(option)}</span>
              <span className="hero-search__option-check" aria-hidden="true" />
            </button>
          )
        })}
      </div>
    )}
  </div>
)

const DateField = ({ label, name, value, onChange, inputRef }) => {
  const openPicker = () => {
    const input = inputRef.current

    if (!input) {
      return
    }

    if (typeof input.showPicker === 'function') {
      input.showPicker()
    } else {
      input.focus()
    }
  }

  return (
    <label className="hero-search__field">
      <span className="hero-search__label">
        <CalendarIcon />
        {label}
      </span>

      <div className="hero-search__date-control">
        <input
          ref={inputRef}
          className="hero-search__date-input"
          type="date"
          name={name}
          value={value}
          onChange={onChange}
        />

        <button
          type="button"
          className="hero-search__date-button"
          aria-label={`Open ${label} date picker`}
          onClick={openPicker}
        >
          <CalendarIcon className="hero-search__date-button-icon" />
        </button>
      </div>
    </label>
  )
}

export default function Hero({ countries, initialSearch, onSearch }) {
  const mediaRef = useParallax(32)
  const searchRef = useRef(null)
  const checkInRef = useRef(null)
  const checkOutRef = useRef(null)
  const [openField, setOpenField] = useState('')
  const [videoReady, setVideoReady] = useState(false)
  const [mobileDetailsOpen, setMobileDetailsOpen] = useState(false)
  const [search, setSearch] = useState(() => buildSearchState(initialSearch, countries))

  useEffect(() => {
    setSearch(buildSearchState(initialSearch, countries))
  }, [countries, initialSearch])

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpenField('')
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpenField('')
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const activeDestination =
    countries.find((country) => country.code === search.destinationCode) || countries[0]

  const updateSearch = (event) => {
    const { name, value } = event.target
    setSearch((currentSearch) => ({ ...currentSearch, [name]: value }))
  }

  const updateSelectField = (fieldName, value) => {
    setSearch((currentSearch) => ({
      ...currentSearch,
      [fieldName]: value,
    }))
    setOpenField('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setOpenField('')
    onSearch(search)
  }

  const handleToggleMobileDetails = () => {
    if (mobileDetailsOpen && (openField === 'guests' || openField === 'roomType')) {
      setOpenField('')
    }

    setMobileDetailsOpen((currentValue) => !currentValue)
  }

  return (
    <section className="hero" id="home" aria-label="Bodunde Vista welcome">
      <div className="hero__media parallax-layer" ref={mediaRef} aria-hidden="true">
        <video
          className={`hero__video${videoReady ? ' hero__video--ready' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setVideoReady(true)}
          onCanPlay={() => setVideoReady(true)}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>

      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__search-wrap">
        <form className="hero-search" ref={searchRef} onSubmit={handleSubmit}>
          <SearchSelectField
            label="Destination"
            icon={<MapPinIcon />}
            value={search.destinationCode}
            isOpen={openField === 'destination'}
            onToggle={() => setOpenField((currentField) => (currentField === 'destination' ? '' : 'destination'))}
            options={countries}
            onSelect={(value) => updateSelectField('destinationCode', value)}
            renderValue={() => (
              <>
                <FlagIcon code={activeDestination.code} />
                <span>{activeDestination.label}</span>
              </>
            )}
            renderOption={(country) => (
              <>
                <FlagIcon code={country.code} />
                <span>{country.label}</span>
              </>
            )}
            fieldClassName="hero-search__field--destination"
          />

          <DateField
            label="Check-in"
            name="checkIn"
            value={search.checkIn}
            onChange={updateSearch}
            inputRef={checkInRef}
          />

          <button
            type="button"
            className={`hero-search__mobile-toggle${
              mobileDetailsOpen ? ' hero-search__mobile-toggle--open' : ''
            }`}
            aria-expanded={mobileDetailsOpen}
            aria-controls="hero-search-mobile-extra"
            onClick={handleToggleMobileDetails}
          >
            <span>{mobileDetailsOpen ? 'Hide details' : 'Add details'}</span>
            <ChevronDownIcon className="hero-search__mobile-toggle-arrow" />
          </button>

          <div
            className={`hero-search__mobile-extra${
              mobileDetailsOpen ? ' hero-search__mobile-extra--open' : ''
            }`}
            id="hero-search-mobile-extra"
          >
            <DateField
              label="Check-out"
              name="checkOut"
              value={search.checkOut}
              onChange={updateSearch}
              inputRef={checkOutRef}
            />

            <SearchSelectField
              label="Guests"
              icon={<UsersIcon />}
              value={search.guests}
              isOpen={openField === 'guests'}
              onToggle={() => setOpenField((currentField) => (currentField === 'guests' ? '' : 'guests'))}
              options={guestOptions}
              onSelect={(value) => updateSelectField('guests', value)}
              renderValue={(value) => <span>{value}</span>}
              renderOption={(option) => <span>{option}</span>}
            />

            <SearchSelectField
              label="Room Type"
              icon={<RoomIcon />}
              value={search.roomType}
              isOpen={openField === 'roomType'}
              onToggle={() => setOpenField((currentField) => (currentField === 'roomType' ? '' : 'roomType'))}
              options={roomTypes}
              onSelect={(value) => updateSelectField('roomType', value)}
              renderValue={(value) => <span>{value}</span>}
              renderOption={(option) => <span>{option}</span>}
            />
          </div>

          <button className="hero-search__button" type="submit">
            <span>Check Availability</span>
            <ArrowUpRightIcon />
          </button>
        </form>

        <div className="hero__trust" aria-label="Booking reassurance">
          <span>5-star guest care</span>
          <span>No login required</span>
          <span>Concierge confirmation by WhatsApp or email</span>
        </div>
      </div>

      <div className="hero__brand-wrap">
        <h1 className="hero__brand">Bodunde Vista</h1>
      </div>
    </section>
  )
}
