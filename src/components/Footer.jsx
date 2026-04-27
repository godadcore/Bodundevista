import logoUrl from '../assets/icons/logo.svg'
import { ArrowUpRightIcon } from './PremiumIcons'
import '../styles/footer.css'

const WHATSAPP_URL =
  'https://wa.me/2349052321666?text=Hello%20Bodunde%20Vista%2C%20I%27d%20like%20to%20request%20a%20booking.'

const QUICK_LINKS = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Highlights', href: '/#features' },
  { label: 'Rooms', href: '/#rooms' },
  { label: 'Questions', href: '/#faq' },
]

const UTILITY_LINKS = [
  { label: 'Amenities', href: '/#amenities' },
  { label: 'Guest notes', href: '/#reviews' },
  { label: 'Journal', href: '/#journal' },
  { label: 'Contact desk', href: '#contact' },
]

const CONTACT_CHANNELS = [
  {
    label: 'WhatsApp',
    href: WHATSAPP_URL,
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5.1 18.9 6.2 15.4a7.4 7.4 0 1 1 2.5 2.3l-3.6 1.2Z" stroke="#C6A96B" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9.3 8.9c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.5 1.2c.1.3.1.5-.1.7l-.4.5c.5 1 1.3 1.8 2.3 2.3l.6-.4c.2-.2.4-.2.7-.1l1.2.5c.3.1.4.3.4.6v.5c0 .3-.1.5-.4.7-.4.2-.9.3-1.4.3-2.8 0-6.1-3.2-6.1-6.1 0-.4.1-.9.4-1.3Z" stroke="#C6A96B" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:hello@getbndlabs.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 6.5h16v11H4z" stroke="#C6A96B" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="m4.8 7.3 7.2 5.4 7.2-5.4" stroke="#C6A96B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Call',
    href: 'tel:+2349052321666',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M8.2 5.4 6.6 6.9c-.4.4-.5 1-.3 1.5 1.4 3.8 4.5 6.9 8.3 8.3.5.2 1.1.1 1.5-.3l1.5-1.6c.4-.4.4-1 .1-1.4l-1.2-1.7c-.3-.4-.8-.6-1.3-.4l-1.7.6a9.2 9.2 0 0 1-3.4-3.4l.6-1.7c.2-.5 0-1-.4-1.3L9.6 5.3c-.5-.3-1-.3-1.4.1Z" stroke="#C6A96B" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__container">
        <div className="footer__grid">
          <div className="footer__brand">
            <a href="/" className="footer__logo">
              <img src={logoUrl} alt="Bodunde Vista logo" />
            </a>

            <p className="footer__tagline">
              Settle into private villa living surrounded by nature, with warm service, quiet rooms, and space for lasting memories.
            </p>

            <p className="footer__mini-copy">
              Booking requests are confirmed personally by customer care. No login or signup required.
            </p>

            <a href="/booking" className="footer__cta">
              Request your stay
              <ArrowUpRightIcon />
            </a>
          </div>

          <div className="footer__col">
            <h4>Quick paths</h4>

            <ul>
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4>Useful pages</h4>

            <ul>
              {UTILITY_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__contact">
            <div>
              <h4>Address</h4>
              <p>
                Lagos, Nigeria<br />
                Private hospitality desk
              </p>
            </div>

            <div>
              <h4>Reach Us</h4>
              <p>
                <a href="mailto:hello@getbndlabs.com">hello@getbndlabs.com</a>
              </p>
              <p>
                <a href="tel:+2349052321666">+234 905 232 1666</a>
              </p>
            </div>
          </div>

          <div className="footer__socials">
            <h4>Concierge</h4>

            {CONTACT_CHANNELS.map((channel) => (
              <a
                href={channel.href}
                key={channel.label}
                target={channel.href.startsWith('https://') ? '_blank' : undefined}
                rel={channel.href.startsWith('https://') ? 'noreferrer' : undefined}
              >
                <span className="footer__icon">{channel.icon}</span>
                {channel.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; Bodunde Vista. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
