import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRightIcon, ChevronDownIcon, StarIcon } from '../components/PremiumIcons'
import bathroomImage from '../assets/images/bathroom.jpg'
import bedroomImage from '../assets/images/bedroom.jpg'
import heroImage from '../assets/images/villa-pool.jpg'
import kitchenImage from '../assets/images/kitchen.jpg'
import livingRoomImage from '../assets/images/living-room.jpg'
import lobbyImage from '../assets/images/lobby.jpg'
import poolViewImage from '../assets/images/hero-image.jpg'
import '../styles/booking.css'

const ALL_FILTER = 'ALL'

const roomTypes = [
  'Standard Room',
  'Deluxe Room',
  'Executive Suite',
  'Family Villa',
  'Luxury Penthouse',
]

const guestOptions = [
  '1 Guest',
  '2 Guests',
  '3 Guests',
  '4 Guests',
  '5 Guests',
  '6+ Guests',
]

const buildSearchState = (initialSearch, countries) => ({
  destinationCode: initialSearch?.destinationCode || countries[0].code,
  checkIn: initialSearch?.checkIn || '',
  checkOut: initialSearch?.checkOut || '',
  guests: initialSearch?.guests || '2 Guests',
  roomType: initialSearch?.roomType || 'Deluxe Room',
})

const currencyByCountry = {
  NG: {
    symbol: '\u20A6',
    rate: 1500,
    decimals: 0,
    spacer: '',
  },
  US: {
    symbol: '$',
    rate: 1,
    decimals: 0,
    spacer: '',
  },
  ZA: {
    symbol: 'R',
    rate: 18,
    decimals: 0,
    spacer: '',
  },
  GB: {
    symbol: '\u00A3',
    rate: 0.79,
    decimals: 0,
    spacer: '',
  },
  FI: {
    symbol: '\u20AC',
    rate: 0.92,
    decimals: 0,
    spacer: '',
  },
  AE: {
    symbol: '\u062F.\u0625',
    rate: 3.67,
    decimals: 0,
    spacer: ' ',
  },
}

const hotels = [
  {
    id: 'lagos-retreat',
    countryCode: 'NG',
    country: 'Nigeria',
    location: 'Victoria Island, Lagos',
    name: 'Lagos Retreat',
    image: heroImage,
    description:
      'A serene coastal stay with private pool corners, signature dining, and polished suites close to Lagos nightlife.',
    rating: '4.9',
    amenities: ['Pool Deck', 'Spa', 'Airport Pickup', 'Breakfast Lounge'],
    priceUsd: 420,
  },
  {
    id: 'abuja-suites',
    countryCode: 'NG',
    country: 'Nigeria',
    location: 'Maitama, Abuja',
    name: 'Abuja Suites',
    image: lobbyImage,
    description:
      'Elegant executive suites with warm hosting, garden lounges, and quick access to Abuja business districts.',
    rating: '4.8',
    amenities: ['Concierge', 'Garden Lounge', 'Secure Parking', 'Workspace'],
    priceUsd: 365,
  },
  {
    id: 'new-york-haven',
    countryCode: 'US',
    country: 'United States',
    location: 'Manhattan, New York',
    name: 'New York Haven',
    image: bedroomImage,
    description:
      'A quiet city address with restful rooms, discreet service, and a refined base for art, dining, and shopping.',
    rating: '4.9',
    amenities: ['King Suite', 'Valet', 'Skyline Access', 'Room Service'],
    priceUsd: 760,
  },
  {
    id: 'miami-bay-stay',
    countryCode: 'US',
    country: 'United States',
    location: 'Biscayne Bay, Miami',
    name: 'Miami Bay Stay',
    image: poolViewImage,
    description:
      'Sunlit rooms and bayfront leisure come together in a bright coastal stay shaped around relaxed luxury.',
    rating: '4.7',
    amenities: ['Bay View', 'Pool Club', 'Cocktail Terrace', 'Beach Transfer'],
    priceUsd: 545,
  },
  {
    id: 'cape-town-escape',
    countryCode: 'ZA',
    country: 'South Africa',
    location: 'Camps Bay, Cape Town',
    name: 'Cape Town Escape',
    image: heroImage,
    description:
      'A scenic escape shaped by poolside living, ocean air, mountain views, and beautifully paced private hosting.',
    rating: '4.9',
    amenities: ['Ocean Air', 'Sunset Bar', 'Private Tours', 'Pool Villa'],
    priceUsd: 485,
  },
  {
    id: 'johannesburg-luxe',
    countryCode: 'ZA',
    country: 'South Africa',
    location: 'Sandton, Johannesburg',
    name: 'Johannesburg Luxe',
    image: kitchenImage,
    description:
      'A sleek urban stay with business-ready suites, curated dining, and quiet interiors for evening calm.',
    rating: '4.8',
    amenities: ['Chef Kitchen', 'Executive Lounge', 'Fast WiFi', 'Late Checkout'],
    priceUsd: 398,
  },
  {
    id: 'london-classic',
    countryCode: 'GB',
    country: 'United Kingdom',
    location: 'Kensington, London',
    name: 'London Classic',
    image: lobbyImage,
    description:
      'Classic London elegance with tailored suites, polished interiors, and seamless access to heritage addresses.',
    rating: '4.8',
    amenities: ['Tea Service', 'Concierge', 'Luxury Linen', 'City Car'],
    priceUsd: 675,
  },
  {
    id: 'manchester-royal',
    countryCode: 'GB',
    country: 'United Kingdom',
    location: 'Deansgate, Manchester',
    name: 'Manchester Royal',
    image: livingRoomImage,
    description:
      'A warm and modern city retreat with spacious lounges, premium finishes, and attentive all-day service.',
    rating: '4.7',
    amenities: ['Club Lounge', 'Rain Shower', 'Dining Room', 'Private Check-in'],
    priceUsd: 458,
  },
  {
    id: 'helsinki-calm',
    countryCode: 'FI',
    country: 'Finland',
    location: 'Kaartinkaupunki, Helsinki',
    name: 'Helsinki Calm',
    image: bathroomImage,
    description:
      'Minimalist Nordic calm with spa-like bathrooms, soft textures, and restorative service for slower stays.',
    rating: '4.8',
    amenities: ['Sauna', 'Wellness Bath', 'Quiet Rooms', 'Nordic Breakfast'],
    priceUsd: 435,
  },
  {
    id: 'lapland-snow-villa',
    countryCode: 'FI',
    country: 'Finland',
    location: 'Rovaniemi, Lapland',
    name: 'Lapland Snow Villa',
    image: bedroomImage,
    description:
      'A warm winter hideaway with cocooned suites, soft lighting, and snowy views designed for quiet luxury.',
    rating: '4.9',
    amenities: ['Snow View', 'Fireplace', 'Private Sauna', 'Aurora Excursions'],
    priceUsd: 590,
  },
  {
    id: 'dubai-marina',
    countryCode: 'AE',
    country: 'United Arab Emirates / Dubai',
    location: 'Dubai Marina, Dubai',
    name: 'Dubai Marina',
    image: livingRoomImage,
    description:
      'A polished marina address with skyline views, spacious lounges, and premium access to shopping and beaches.',
    rating: '5.0',
    amenities: ['Marina View', 'Rooftop Pool', 'Butler Service', 'Gym'],
    priceUsd: 705,
  },
  {
    id: 'abu-dhabi-pearl',
    countryCode: 'AE',
    country: 'United Arab Emirates / Dubai',
    location: 'Corniche, Abu Dhabi',
    name: 'Abu Dhabi Pearl',
    image: poolViewImage,
    description:
      'A bright waterfront stay balancing polished suites, curated hospitality, and understated coastal glamour.',
    rating: '4.8',
    amenities: ['Waterfront', 'Private Dining', 'Spa Suites', 'Car Service'],
    priceUsd: 610,
  },
]

const CalendarIcon = ({ className = 'booking-icon' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7 3v4" />
    <path d="M17 3v4" />
    <rect x="4" y="6" width="16" height="15" rx="3" />
    <path d="M4 11h16" />
  </svg>
)

const MapPinIcon = ({ className = 'booking-icon' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 21s7-5.4 7-11a7 7 0 0 0-14 0c0 5.6 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)

const UsersIcon = ({ className = 'booking-icon' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M16 19c0-2.2-1.8-4-4-4H8c-2.2 0-4 1.8-4 4" />
    <circle cx="10" cy="8" r="4" />
    <path d="M21 19c0-2-1.4-3.6-3.3-3.9" />
    <path d="M16.8 4.2a3.2 3.2 0 0 1 0 6.1" />
  </svg>
)

const RoomIcon = ({ className = 'booking-icon' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 11V6.8C4 5.2 5.2 4 6.8 4h10.4C18.8 4 20 5.2 20 6.8V11" />
    <path d="M4 20v-6h16v6" />
    <path d="M7 14v-2.5c0-.8.7-1.5 1.5-1.5h7c.8 0 1.5.7 1.5 1.5V14" />
    <path d="M4 17h16" />
  </svg>
)

const CloseIcon = ({ className = 'booking-icon' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 6l12 12" />
    <path d="M18 6 6 18" />
  </svg>
)

const CheckIcon = ({ className = 'booking-icon' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path d="m5 12 4.2 4.2L19 6.8" />
  </svg>
)

const AlertIcon = ({ className = 'booking-icon' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 4 4 19h16L12 4Z" />
    <path d="M12 9v4.2" />
    <circle cx="12" cy="16.6" r="0.8" fill="currentColor" stroke="none" />
  </svg>
)

const FlagIcon = ({ code }) => (
  <svg className="booking-flag" viewBox="0 0 36 24" aria-hidden="true">
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

const FieldLabel = ({ children, icon }) => (
  <span className="booking-field__label">
    {icon}
    {children}
  </span>
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
  <div className={`booking-field ${fieldClassName}`.trim()}>
    <FieldLabel icon={icon}>{label}</FieldLabel>

    <button
      type="button"
      className={`booking-select${isOpen ? ' booking-select--open' : ''}`}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      onClick={onToggle}
    >
      <span className="booking-select__value">{renderValue(value)}</span>
      <ChevronDownIcon className="booking-select__arrow" />
    </button>

    {isOpen && (
      <div className="booking-select__panel" role="listbox">
        {options.map((option) => {
          const optionValue = typeof option === 'string' ? option : option.code
          const selected = optionValue === value

          return (
            <button
              type="button"
              key={optionValue}
              className={`booking-select__option${selected ? ' booking-select__option--active' : ''}`}
              role="option"
              aria-selected={selected}
              onClick={() => onSelect(optionValue)}
            >
              <span className="booking-select__option-content">{renderOption(option)}</span>
              <span className="booking-select__check" aria-hidden="true" />
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
    <label className="booking-field">
      <FieldLabel icon={<CalendarIcon />}>{label}</FieldLabel>

      <div className="booking-field__control booking-field__control--date">
        <input
          ref={inputRef}
          className="booking-field__date-input"
          type="date"
          name={name}
          value={value}
          onChange={onChange}
        />

        <button
          type="button"
          className="booking-field__date-button"
          aria-label={`Open ${label} date picker`}
          onClick={openPicker}
        >
          <CalendarIcon className="booking-field__date-button-icon" />
        </button>
      </div>
    </label>
  )
}

const ModalSelectField = ({
  label,
  value,
  isOpen,
  onToggle,
  options,
  onSelect,
  errorText = '',
  fieldRef,
}) => (
  <label className={`booking-modal__field${errorText ? ' booking-modal__field--invalid' : ''}`}>
    <span>{label}</span>

    <div className="booking-modal__control booking-modal__control--select" ref={fieldRef}>
      <button
        type="button"
        className={`booking-modal__select${isOpen ? ' booking-modal__select--open' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className="booking-modal__select-value">{value}</span>
        <ChevronDownIcon className="booking-modal__select-arrow" />
      </button>

      {isOpen && (
        <div className="booking-modal__select-panel" role="listbox">
          {options.map((option) => {
            const selected = option === value

            return (
              <button
                type="button"
                key={option}
                className={`booking-modal__select-option${
                  selected ? ' booking-modal__select-option--active' : ''
                }`}
                role="option"
                aria-selected={selected}
                onClick={() => onSelect(option)}
              >
                <span>{option}</span>
                <span className="booking-modal__select-check" aria-hidden="true" />
              </button>
            )
          })}
        </div>
      )}
    </div>

    {errorText && <small>{errorText}</small>}
  </label>
)

const ModalDateField = ({ label, name, value, onChange, inputRef, errorText = '' }) => {
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
    <label className={`booking-modal__field${errorText ? ' booking-modal__field--invalid' : ''}`}>
      <span>{label}</span>

      <div className="booking-modal__control booking-modal__control--date">
        <input
          ref={inputRef}
          className="booking-modal__date-input"
          type="date"
          name={name}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(errorText)}
        />

        <button
          type="button"
          className="booking-modal__date-button"
          aria-label={`Open ${label} date picker`}
          onClick={openPicker}
        >
          <CalendarIcon className="booking-modal__date-button-icon" />
        </button>
      </div>

      {errorText && <small>{errorText}</small>}
    </label>
  )
}

export default function BookingPage({
  countries,
  selectedCountry,
  initialSearch,
  searchRevision,
  onSearch,
}) {
  const searchRef = useRef(null)
  const modalGuestsRef = useRef(null)
  const checkInRef = useRef(null)
  const checkOutRef = useRef(null)
  const modalCheckInRef = useRef(null)
  const modalCheckOutRef = useRef(null)
  const [openField, setOpenField] = useState('')
  const [modalField, setModalField] = useState('')
  const [search, setSearch] = useState(() => buildSearchState(initialSearch, countries))
  const [activeFilter, setActiveFilter] = useState(() => initialSearch?.destinationCode || ALL_FILTER)
  const [selectedHotel, setSelectedHotel] = useState(null)
  const [bookingDraft, setBookingDraft] = useState({
    fullName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '2 Guests',
    specialRequest: '',
  })
  const [formErrors, setFormErrors] = useState({})
  const [bookingStatus, setBookingStatus] = useState({ type: '', text: '' })

  const activeCurrency = currencyByCountry[selectedCountry?.code] || currencyByCountry.NG

  const filteredHotels = useMemo(() => {
    if (activeFilter === ALL_FILTER) {
      return hotels
    }

    return hotels.filter((hotel) => hotel.countryCode === activeFilter)
  }, [activeFilter])

  const activeDestination =
    countries.find((country) => country.code === search.destinationCode) || countries[0]

  useEffect(() => {
    setSearch(buildSearchState(initialSearch, countries))

    if (searchRevision > 0) {
      setActiveFilter(initialSearch?.destinationCode || ALL_FILTER)
    }
  }, [countries, initialSearch, searchRevision])

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpenField('')
      }

      if (modalGuestsRef.current && !modalGuestsRef.current.contains(event.target)) {
        setModalField('')
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpenField('')
        setModalField('')
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

  useEffect(() => {
    if (!selectedHotel) {
      return undefined
    }

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedHotel(null)
        setBookingStatus({ type: '', text: '' })
        setFormErrors({})
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [selectedHotel])

  const formatPrice = (usdAmount) => {
    const convertedAmount = usdAmount * activeCurrency.rate
    const formattedAmount = convertedAmount.toLocaleString(undefined, {
      maximumFractionDigits: activeCurrency.decimals,
      minimumFractionDigits: activeCurrency.decimals,
    })

    return `${activeCurrency.symbol}${activeCurrency.spacer}${formattedAmount}`
  }

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

  const handleSearch = (event) => {
    event.preventDefault()
    setOpenField('')
    setActiveFilter(search.destinationCode)
    onSearch(search)
  }

  const openBookingModal = (hotel) => {
    setSelectedHotel(hotel)
    setModalField('')
    setFormErrors({})
    setBookingStatus({ type: '', text: '' })
    setBookingDraft({
      fullName: '',
      email: '',
      phone: '',
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      guests: search.guests,
      specialRequest: '',
    })
  }

  const closeBookingModal = () => {
    setSelectedHotel(null)
    setModalField('')
    setFormErrors({})
    setBookingStatus({ type: '', text: '' })
  }

  const updateBookingDraftField = (name, value) => {
    setBookingDraft((currentDraft) => ({
      ...currentDraft,
      [name]: value,
    }))

    setFormErrors((currentErrors) => {
      if (!currentErrors[name]) {
        return currentErrors
      }

      const nextErrors = { ...currentErrors }
      delete nextErrors[name]
      return nextErrors
    })

    setBookingStatus((currentStatus) =>
      currentStatus.type === 'error' ? { type: '', text: '' } : currentStatus,
    )
  }

  const updateBookingDraft = (event) => {
    const { name, value } = event.target
    updateBookingDraftField(name, value)
  }

  const validateBookingDraft = () => {
    const errors = {}

    if (!bookingDraft.fullName.trim()) {
      errors.fullName = 'Full name is required.'
    }

    if (!bookingDraft.email.trim()) {
      errors.email = 'Email is required.'
    }

    if (!bookingDraft.phone.trim()) {
      errors.phone = 'Phone is required.'
    }

    if (!bookingDraft.checkIn) {
      errors.checkIn = 'Check-in date is required.'
    }

    if (!bookingDraft.checkOut) {
      errors.checkOut = 'Check-out date is required.'
    }

    if (!bookingDraft.guests) {
      errors.guests = 'Guest count is required.'
    }

    return errors
  }

  const confirmBooking = (event) => {
    event.preventDefault()

    const errors = validateBookingDraft()

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      setBookingStatus({
        type: 'error',
        text: 'Please complete all required fields before confirming your booking.',
      })
      return
    }

    setFormErrors({})
    setBookingStatus({
      type: 'success',
      text: 'Booking request received. Our team will contact you shortly.',
    })
  }

  return (
    <div className="booking-page">
      <section className="booking-hero" aria-label="Hotel booking search">
        <div className="booking-hero__media" aria-hidden="true">
          <img src={heroImage} alt="" />
        </div>
        <div className="booking-hero__overlay" aria-hidden="true" />

        <div className="booking-hero__content">
          <p className="booking-hero__eyebrow">BodundeVista Reservations</p>
          <h1>Reserve a refined stay across our global collection</h1>
          <p>
            Search BodundeVista hotels in Nigeria, the United States, South Africa,
            the United Kingdom, Finland, and the United Arab Emirates / Dubai.
          </p>
        </div>
      </section>

      <div className="booking-search-shell">
        <form className="booking-search-card" ref={searchRef} onSubmit={handleSearch}>
          <SearchSelectField
            label="Destination / Country"
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
            fieldClassName="booking-field--destination"
          />

          <DateField
            label="Check-in"
            name="checkIn"
            value={search.checkIn}
            onChange={updateSearch}
            inputRef={checkInRef}
          />

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

          <button className="booking-search-card__button" type="submit">
            <span>Search</span>
            <ArrowUpRightIcon />
          </button>
        </form>
      </div>

      <section className="booking-results" aria-label="Hotel results">
        <div className="booking-results__container">
          <div className="booking-results__header">
            <div>
              <p className="booking-results__eyebrow">International Collection</p>
              <h2>Available BodundeVista Stays</h2>
            </div>

            <div className="booking-results__summary">
              <p>
                {filteredHotels.length} premium {filteredHotels.length === 1 ? 'hotel' : 'hotels'} found
                {activeFilter !== ALL_FILTER
                  ? ` in ${countries.find((country) => country.code === activeFilter)?.label}`
                  : ' across all destinations'}
                .
              </p>
              <p>Prices are shown in your selected currency: {activeCurrency.symbol}</p>
            </div>
          </div>

          <div className="booking-filter-bar" aria-label="Filter hotel results by country">
            <button
              type="button"
              className={`booking-filter-bar__button${
                activeFilter === ALL_FILTER ? ' booking-filter-bar__button--active' : ''
              }`}
              onClick={() => setActiveFilter(ALL_FILTER)}
            >
              All Destinations
            </button>

            {countries.map((country) => (
              <button
                key={country.code}
                type="button"
                className={`booking-filter-bar__button${
                  activeFilter === country.code ? ' booking-filter-bar__button--active' : ''
                }`}
                onClick={() => setActiveFilter(country.code)}
              >
                {country.navLabel || country.label}
              </button>
            ))}
          </div>

          <div className="booking-hotel-grid">
            {filteredHotels.map((hotel) => (
              <article className="booking-hotel-card" key={hotel.id}>
                <div className="booking-hotel-card__image">
                  <img src={hotel.image} alt={hotel.name} />
                  <span className="booking-hotel-card__location">
                    <MapPinIcon />
                    {hotel.location}
                  </span>
                </div>

                <div className="booking-hotel-card__body">
                  <div className="booking-hotel-card__topline">
                    <span>{hotel.country}</span>
                    <div className="booking-stars" aria-label={`${hotel.rating} out of 5 stars`}>
                      <StarIcon />
                      <strong>{hotel.rating}</strong>
                    </div>
                  </div>

                  <h3>{hotel.name}</h3>
                  <p>{hotel.description}</p>

                  <div className="booking-amenities" aria-label="Amenities">
                    {hotel.amenities.map((amenity) => (
                      <span key={amenity}>{amenity}</span>
                    ))}
                  </div>

                  <div className="booking-hotel-card__footer">
                    <div className="booking-price">
                      <strong>{formatPrice(hotel.priceUsd)}</strong>
                      <span>per night</span>
                    </div>

                    <div className="booking-hotel-card__actions">
                      <button
                        type="button"
                        className="booking-button booking-button--ghost"
                        onClick={() => openBookingModal(hotel)}
                      >
                        View Details
                      </button>
                      <button
                        type="button"
                        className="booking-button"
                        onClick={() => openBookingModal(hotel)}
                      >
                        Book Now
                        <ArrowUpRightIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedHotel && (
        <div className="booking-modal" role="presentation" onMouseDown={closeBookingModal}>
          <div
            className="booking-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="booking-modal__close"
              type="button"
              aria-label="Close booking details"
              onClick={closeBookingModal}
            >
              <CloseIcon />
            </button>

            <div className="booking-modal__media">
              <img src={selectedHotel.image} alt={selectedHotel.name} />
            </div>

            <div className="booking-modal__content">
              <div className="booking-modal__summary">
                <span className="booking-modal__country">
                  <MapPinIcon />
                  {selectedHotel.country}
                </span>
                <h2 id="booking-modal-title">{selectedHotel.name}</h2>
                <p>{selectedHotel.description}</p>

                <div className="booking-modal__price">
                  <strong>{formatPrice(selectedHotel.priceUsd)}</strong>
                  <span>per night</span>
                </div>

                <div className="booking-amenities booking-amenities--modal">
                  {selectedHotel.amenities.map((amenity) => (
                    <span key={amenity}>{amenity}</span>
                  ))}
                </div>
              </div>

              <form className="booking-modal__form" onSubmit={confirmBooking}>
                <div className="booking-modal__form-grid">
                  <label className={formErrors.fullName ? 'booking-modal__field--invalid' : ''}>
                    <span>Full Name</span>
                    <input
                      type="text"
                      name="fullName"
                      value={bookingDraft.fullName}
                      onChange={updateBookingDraft}
                      placeholder="Your full name"
                      aria-invalid={Boolean(formErrors.fullName)}
                    />
                    {formErrors.fullName && <small>{formErrors.fullName}</small>}
                  </label>

                  <label className={formErrors.email ? 'booking-modal__field--invalid' : ''}>
                    <span>Email</span>
                    <input
                      type="email"
                      name="email"
                      value={bookingDraft.email}
                      onChange={updateBookingDraft}
                      placeholder="you@example.com"
                      aria-invalid={Boolean(formErrors.email)}
                    />
                    {formErrors.email && <small>{formErrors.email}</small>}
                  </label>

                  <label className={formErrors.phone ? 'booking-modal__field--invalid' : ''}>
                    <span>Phone</span>
                    <input
                      type="tel"
                      name="phone"
                      value={bookingDraft.phone}
                      onChange={updateBookingDraft}
                      placeholder="+234 000 000 0000"
                      aria-invalid={Boolean(formErrors.phone)}
                    />
                    {formErrors.phone && <small>{formErrors.phone}</small>}
                  </label>

                  <ModalSelectField
                    label="Guests"
                    value={bookingDraft.guests}
                    isOpen={modalField === 'guests'}
                    onToggle={() => setModalField((currentField) => (currentField === 'guests' ? '' : 'guests'))}
                    options={guestOptions}
                    onSelect={(value) => {
                      updateBookingDraftField('guests', value)
                      setModalField('')
                    }}
                    errorText={formErrors.guests}
                    fieldRef={modalGuestsRef}
                  />

                  <ModalDateField
                    label="Check-in"
                    name="checkIn"
                    value={bookingDraft.checkIn}
                    onChange={updateBookingDraft}
                    inputRef={modalCheckInRef}
                    errorText={formErrors.checkIn}
                  />

                  <ModalDateField
                    label="Check-out"
                    name="checkOut"
                    value={bookingDraft.checkOut}
                    onChange={updateBookingDraft}
                    inputRef={modalCheckOutRef}
                    errorText={formErrors.checkOut}
                  />
                </div>

                <label className="booking-modal__textarea">
                  <span>Special Request</span>
                  <textarea
                    name="specialRequest"
                    value={bookingDraft.specialRequest}
                    onChange={updateBookingDraft}
                    placeholder="Arrival details, celebrations, room preferences, or any special request."
                    rows="4"
                  />
                </label>

                {bookingStatus.text && (
                  <p
                    className={`booking-modal__message booking-modal__message--${bookingStatus.type}`}
                    role="status"
                  >
                    {bookingStatus.type === 'success' ? <CheckIcon /> : <AlertIcon />}
                    {bookingStatus.text}
                  </p>
                )}

                <div className="booking-modal__actions">
                  <button className="booking-button" type="submit">
                    Confirm Booking
                  </button>
                  <button
                    className="booking-button booking-button--light"
                    type="button"
                    onClick={closeBookingModal}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
