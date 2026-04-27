import logoUrl from '../assets/icons/logo.svg'
import { ArrowUpRightIcon } from './PremiumIcons'
import '../styles/footer.css'

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

const SOCIALS = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="#C6A96B" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4" stroke="#C6A96B" strokeWidth="1.6" />
        <circle cx="17.5" cy="6.5" r="1" fill="#C6A96B" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H7v4h3v7h4v-7h3l1-4h-4V9c0-.55.45-1 1-1Z" fill="#C6A96B" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 4l16 16M20 4L4 20" stroke="#C6A96B" strokeWidth="2" strokeLinecap="round" />
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

            <a href="/booking" className="footer__cta">
              Book your stay
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
            <h4>Social</h4>

            {SOCIALS.map((social) => (
              <a href={social.href} key={social.label}>
                <span className="footer__icon">{social.icon}</span>
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <p>© Bodunde Vista. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
