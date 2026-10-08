import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1))
      let attempts = 0
      let frame
      const tryScroll = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else if (attempts < 30) {
          attempts += 1
          frame = requestAnimationFrame(tryScroll)
        }
      }
      tryScroll()
      return () => frame && cancelAnimationFrame(frame)
    }
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  return null
}
