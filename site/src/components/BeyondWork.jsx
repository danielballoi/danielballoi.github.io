import { pick, useLanguage } from '../i18n/LanguageContext'
import { useStrings } from '../i18n/strings'
import profile from '../content/profile.json'
import './BeyondWork.css'

export default function BeyondWork() {
  const lang = useLanguage()
  const t = useStrings(lang)

  return (
    <section className="beyond-work">
      <h2 className="section-title">{t.beyondWork.sectionTitle}</h2>
      <p className="beyond-work__eyebrow">{t.beyondWork.eyebrow}</p>
      <div className="beyond-work__body">
        {profile.beyondWork.photo && (
          <img className="beyond-work__photo" src={profile.beyondWork.photo} alt="" loading="lazy" />
        )}
        <p className="beyond-work__text">{pick(profile.beyondWork.text, lang)}</p>
      </div>
    </section>
  )
}
