import { useRef, useState } from 'react'
import livingRoomImage from '../assets/images/living-room.jpg'
import propertyTourVideo from '../assets/videos/property-tour.mp4'
import '../styles/sections.css'

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

const VolumeIcon = ({ muted }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 10v4h4l5 4V6l-5 4H4Z" />
    {muted ? (
      <>
        <path d="M17 9l4 4" />
        <path d="M21 9l-4 4" />
      </>
    ) : (
      <>
        <path d="M16.5 9.5a4 4 0 0 1 0 5" />
        <path d="M19 7a7.5 7.5 0 0 1 0 10" />
      </>
    )}
  </svg>
)

export default function VideoSection() {
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [videoMuted, setVideoMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef(null)

  const toggleVideo = async () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      await video.play()
      setVideoPlaying(true)
    } else {
      video.pause()
      setVideoPlaying(false)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setVideoMuted(video.muted)
  }

  const updateProgress = () => {
    const video = videoRef.current
    if (!video || !video.duration) return
    setProgress((video.currentTime / video.duration) * 100)
  }

  return (
    <section className="watch-video" id="tour" aria-label="Property video tour">
      <video
        ref={videoRef}
        playsInline
        poster={livingRoomImage}
        onTimeUpdate={updateProgress}
        onEnded={() => setVideoPlaying(false)}
      >
        <source src={propertyTourVideo} type="video/mp4" />
      </video>

      <div className="watch-video__overlay" aria-hidden="true" />

      <button
        type="button"
        className={`watch-video__main ${videoPlaying ? 'watch-video__main--visible' : ''}`}
        onClick={toggleVideo}
      >
        <span>{videoPlaying ? <PauseIcon /> : <PlayIcon />}</span>
        {videoPlaying ? 'Pause Tour' : 'Watch Tour'}
      </button>

      <button
        type="button"
        className="watch-video__sound"
        onClick={toggleMute}
        aria-label={videoMuted ? 'Turn sound on' : 'Turn sound off'}
      >
        <VolumeIcon muted={videoMuted} />
      </button>

      <div className="watch-video__progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
    </section>
  )
}
