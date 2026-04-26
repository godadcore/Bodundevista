# Bodunde Vista Landing Page

A React and Vite hotel landing page for a quiet luxury villa stay. The project uses the logo in `src/assets/icons/logo.svg`, organized section components, and imported image/video assets so the production build can bundle everything correctly.

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` after the dev server starts.

## Production Build

```bash
npm run build
```

## Project Structure

```text
hotel-landing-page/
  index.html
  vite.config.js
  package.json
  src/
    App.jsx
    main.jsx
    assets/
      icons/logo.svg
      images/
        bathroom.jpg
        bedroom.jpg
        hero-image.jpg
        kitchen.jpg
        living-room.jpg
        lobby.jpg
        villa-pool.jpg
      videos/
        hero-video.mp4
        property-tour.mp4
    components/
      Navbar.jsx
      Hero.jsx
      AboutSection.jsx
      VillaFeaturesSection.jsx
      AmenitiesSection.jsx
      RoomsSection.jsx
      ReviewsSection.jsx
      VideoSection.jsx
      ArticlesSection.jsx
      FAQSection.jsx
      Footer.jsx
    styles/
      global.css
      navbar.css
      hero.css
      sections.css
      footer.css
```

## Sections

- `Hero.jsx`: full-screen video opening.
- `AboutSection.jsx`: intro copy, video tour control, and guest stats.
- `VillaFeaturesSection.jsx`: feature highlights over the villa image.
- `AmenitiesSection.jsx`: amenities, story, and setting blocks.
- `RoomsSection.jsx`: room carousel with country-based pricing.
- `ReviewsSection.jsx`: rotating guest notes.
- `VideoSection.jsx`: property tour video.
- `ArticlesSection.jsx`: journal cards.
- `FAQSection.jsx`: booking questions and image gallery.
- `Footer.jsx`: contact details, quick links, and social links.
