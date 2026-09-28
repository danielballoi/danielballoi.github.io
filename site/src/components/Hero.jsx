import { useLanguage, pick } from '../i18n/LanguageContext'
import { useStrings } from '../i18n/strings'
import profile from '../content/profile.json'
import CopyButton from './CopyButton'
import './Hero.css'

export default function Hero() {
  const lang = useLanguage()
  const t = useStrings(lang)
  const alt = pick(profile.photo.alt, lang)

  return (
    <section className="hero" aria-label={lang === 'en' ? 'Introduction' : 'Presentazione'}>
      <div className="hero__identity">
        <picture className="hero__photo-frame">
          <source
            type="image/avif"
            srcSet="/img/foto-240.avif 240w, /img/foto-480.avif 480w"
            sizes="(min-width: 640px) 120px, 88px"
          />
          <source
            type="image/webp"
            srcSet="/img/foto-240.webp 240w, /img/foto-480.webp 480w"
            sizes="(min-width: 640px) 120px, 88px"
          />
          <img
            src="/img/foto-240.jpg"
            srcSet="/img/foto-240.jpg 240w, /img/foto-480.jpg 480w"
            sizes="(min-width: 640px) 120px, 88px"
            width="240"
            height="360"
            alt={alt}
            className="hero__photo"
          />
        </picture>

        <div className="hero__heading">
          <h1 className="hero__name">{profile.name}</h1>
          <p className="hero__title">{pick(profile.title, lang)}</p>
        </div>
      </div>

      <p className="hero__badge">// {pick(profile.badges[0], lang)}</p>
      <p className="hero__experience">{pick(profile.experienceLine, lang)}</p>
      <p className="hero__availability">{pick(profile.availability, lang)}</p>
      <p className="hero__value-prop">{pick(profile.valueProp, lang)}</p>

      <div className="hero__actions">
        <a className="hero__cta hero__cta--primary" href={pick(profile.cv, lang)} download>
          {t.hero.scaricaCv}
        </a>
        <a className="hero__cta" href={profile.links.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a className="hero__cta" href={profile.links.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a className="hero__cta" href={`mailto:${profile.links.email}`}>
          {t.hero.email}
        </a>
        <CopyButton
          className="hero__cta hero__cta--ghost"
          value={profile.links.email}
          label={t.hero.copiaEmail}
          copiedLabel={t.hero.emailCopiata}
        />
      </div>
    </section>
  )
}
