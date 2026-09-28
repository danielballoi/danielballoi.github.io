import { useEffect, useRef, useState } from 'react'
import { pick, useLanguage } from '../i18n/LanguageContext'
import './EpisodeCarousel.css'

export default function EpisodeCarousel({ episodes, subtitlesNote }) {
  const lang = useLanguage()
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const touchStartX = useRef(null)

  useEffect(() => {
    const match = window.location.hash.match(/^#episodio-(\d+)$/)
    if (!match) return
    const targetId = Number(match[1])
    const targetIndex = episodes.findIndex((ep) => ep.id === targetId)
    if (targetIndex >= 0) setIndex(targetIndex)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const episode = episodes[index]
  const note = pick(subtitlesNote, lang)

  function goTo(nextIndex) {
    const clamped = (nextIndex + episodes.length) % episodes.length
    setIndex(clamped)
    setPlaying(false)
    setMuted(true)
  }

  function handleKeyDown(event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goTo(index - 1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      goTo(index + 1)
    }
  }

  function handleTouchStart(event) {
    touchStartX.current = event.touches[0].clientX
  }

  function handleTouchEnd(event) {
    if (touchStartX.current == null) return
    const deltaX = event.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(deltaX) > 40) {
      goTo(deltaX < 0 ? index + 1 : index - 1)
    }
    touchStartX.current = null
  }

  if (!episodes.length) return null

  return (
    <div className="episode-carousel">
      {episodes.map((ep) => (
        <span key={ep.id} id={`episodio-${ep.id}`} className="episode-carousel__anchor" aria-hidden="true" />
      ))}
      <div
        className="episode-carousel__viewport"
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          className="episode-carousel__arrow episode-carousel__arrow--prev"
          onClick={() => goTo(index - 1)}
          aria-label={lang === 'en' ? 'Previous episode' : 'Episodio precedente'}
        >
          ‹
        </button>

        <div className="episode-carousel__stage">
          {playing ? (
            <video
              key={episode.id}
              className="episode-carousel__video"
              src={episode.video}
              poster={episode.poster}
              controls
              autoPlay
              muted={muted}
              preload="none"
              onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
            >
              <track kind="captions" />
            </video>
          ) : (
            <button
              type="button"
              className="episode-carousel__poster"
              style={{ backgroundImage: `url(${episode.poster})` }}
              onClick={() => setPlaying(true)}
            >
              <span className="episode-carousel__play" aria-hidden="true">
                ►
              </span>
              <span className="visually-hidden">
                {lang === 'en' ? 'Play episode' : 'Riproduci episodio'} {episode.id}: {pick(episode.title, lang)}
              </span>
            </button>
          )}

          <div className="episode-carousel__meta">
            <span className="episode-carousel__title">
              {episode.id}. {pick(episode.title, lang)}
            </span>
            <span className="episode-carousel__duration">{episode.duration}</span>
          </div>
          {note && <p className="episode-carousel__note">{note}</p>}
        </div>

        <button
          type="button"
          className="episode-carousel__arrow episode-carousel__arrow--next"
          onClick={() => goTo(index + 1)}
          aria-label={lang === 'en' ? 'Next episode' : 'Episodio successivo'}
        >
          ›
        </button>
      </div>

      <div className="episode-carousel__dots" role="tablist" aria-label={lang === 'en' ? 'Episodes' : 'Episodi'}>
        {episodes.map((ep, i) => (
          <button
            key={ep.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-current={i === index ? 'true' : undefined}
            className="episode-carousel__dot"
            onClick={() => goTo(i)}
          >
            <span className="visually-hidden">
              {ep.id}. {pick(ep.title, lang)}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
