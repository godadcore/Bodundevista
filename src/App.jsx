import { useState } from 'react'
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

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState({ code: 'NG', label: 'Nigeria' })

  return (
    <>
      <Navbar
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />

      <main>
        <Hero />
        <AboutSection />
        <VillaFeaturesSection />
        <AmenitiesSection />
        <RoomsSection selectedCountry={selectedCountry} />
        <ReviewsSection />
        <VideoSection />
        <ArticlesSection />
        <FAQSection />
      </main>

      <Footer />
    </>
  )
}
