import kitchenImage from '../assets/images/kitchen.jpg'
import livingRoomImage from '../assets/images/living-room.jpg'
import lobbyImage from '../assets/images/lobby.jpg'
import { ArrowUpRightIcon } from './PremiumIcons'
import useParallax from '../hooks/useParallax'
import '../styles/sections.css'

const ARTICLES = [
  {
    category: 'Travel Notes',
    date: 'December 12, 2025',
    title: 'Simple packing habits for safer, calmer journeys',
    image: lobbyImage,
  },
  {
    category: 'Wellness',
    date: 'December 8, 2025',
    title: 'Memorable reset rituals to add to your next escape',
    image: livingRoomImage,
  },
  {
    category: 'Dining',
    date: 'December 5, 2025',
    title: 'Private dining touches that make a villa stay feel personal',
    image: kitchenImage,
  },
]

const SectionIcon = () => (
  <svg viewBox="0 0 48 24" aria-hidden="true">
    <path d="M6 12c5.5-6.8 13.2-6.8 18.7 0S37.9 18.8 43.4 12" />
    <path d="M6 12c5.5 6.8 13.2 6.8 18.7 0S37.9 5.2 43.4 12" />
    <circle cx="24" cy="12" r="3.5" />
  </svg>
)

export default function ArticlesSection() {
  const articleOneRef = useParallax({ y: 10, revealX: 135, revealY: 48, revealScale: -0.05, fade: true })
  const articleTwoRef = useParallax({ y: -12, revealY: 62, revealScale: -0.05, fade: true })
  const articleThreeRef = useParallax({ y: 10, revealX: -135, revealY: 48, revealScale: -0.05, fade: true })
  const articleRefs = [articleOneRef, articleTwoRef, articleThreeRef]

  return (
    <section className="articles-section" id="journal">
      <div className="articles-section__header">
        <p className="articles-section__label">
          <SectionIcon />
          Journal
          <SectionIcon />
        </p>

        <h2 className="articles-section__title">Stories &amp; Updates</h2>
      </div>

      <div className="articles-grid">
        {ARTICLES.map((article, index) => (
          <article
            className={`article-card parallax-layer ${index === 1 ? 'article-card--raised' : ''}`}
            key={article.title}
            ref={articleRefs[index]}
          >
            <div className="article-card__image">
              <img src={article.image} alt={article.title} />
            </div>

            <div className="article-card__body">
              <div className="article-card__meta">
                <span>{article.category}</span>
                <span>{article.date}</span>
              </div>

              <h3>{article.title}</h3>

              <a href="/booking" className="article-card__button">
                Plan a Stay
                <ArrowUpRightIcon />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
