import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import SeoHead from '../components/SeoHead'
import profile from '../content/profile.json'
import './Privacy.css'

export default function Privacy() {
  const lang = useLanguage()
  const path = lang === 'en' ? '/en/privacy' : '/privacy'
  const homePath = lang === 'en' ? '/en/' : '/'

  if (lang === 'en') {
    return (
      <>
        <SeoHead
          title="Privacy policy — Daniel Balloi"
          description="What data the contact form collects, why, for how long, and how to request deletion."
          path={path}
        />
        <main className="privacy">
          <Link to={homePath} className="privacy__back">
            ← Back to home
          </Link>
          <h1>Privacy policy</h1>
          <p className="privacy__updated">Last updated: 28 September 2026.</p>

          <h2>Data collected</h2>
          <p>
            The contact form on this site collects only the data you choose to enter: name, email address and the
            content of your message. There is no tracking cookie and no analytics library of any kind.
          </p>

          <h2>Purpose</h2>
          <p>This data is used exclusively to reply to your message. It is never sold, shared or used for marketing.</p>

          <h2>Retention</h2>
          <p>Messages are kept for 12 months from receipt, after which they are deleted automatically.</p>

          <h2>Your rights</h2>
          <p>
            You can ask to have your message deleted at any time by writing to{' '}
            <a href={`mailto:${profile.links.email}`}>{profile.links.email}</a>.
          </p>

          <h2>Cookies</h2>
          <p>This site does not use tracking cookies or analytics of any kind.</p>
        </main>
      </>
    )
  }

  return (
    <>
      <SeoHead
        title="Informativa privacy — Daniel Balloi"
        description="Quali dati raccoglie il modulo contatti, perché, per quanto tempo e come chiederne la cancellazione."
        path={path}
      />
      <main className="privacy">
        <Link to={homePath} className="privacy__back">
          ← Torna alla home
        </Link>
        <h1>Informativa privacy</h1>
        <p className="privacy__updated">Ultimo aggiornamento: 28 settembre 2026.</p>

        <h2>Dati raccolti</h2>
        <p>
          Il modulo contatti di questo sito raccoglie solo i dati che scegli di inserire: nome, indirizzo email e il
          contenuto del messaggio. Il sito non usa alcun cookie di tracciamento né librerie di analytics.
        </p>

        <h2>Finalità</h2>
        <p>
          Questi dati vengono usati esclusivamente per risponderti. Non vengono mai venduti, condivisi o usati per
          finalità di marketing.
        </p>

        <h2>Conservazione</h2>
        <p>I messaggi vengono conservati per 12 mesi dalla ricezione, dopodiché vengono cancellati automaticamente.</p>

        <h2>I tuoi diritti</h2>
        <p>
          Puoi chiedere la cancellazione del tuo messaggio in qualsiasi momento scrivendo a{' '}
          <a href={`mailto:${profile.links.email}`}>{profile.links.email}</a>.
        </p>

        <h2>Cookie</h2>
        <p>Questo sito non utilizza cookie di tracciamento né strumenti di analytics di alcun tipo.</p>
      </main>
    </>
  )
}
