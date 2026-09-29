import { pick, useLanguage } from '../i18n/LanguageContext'
import { useStrings } from '../i18n/strings'
import './CertificationCard.css'

export default function CertificationCard({ certification }) {
  const lang = useLanguage()
  const t = useStrings(lang)
  const name = pick(certification.name, lang) ?? certification.name
  const issuer = pick(certification.issuer, lang) ?? certification.issuer
  const issued = pick(certification.issued, lang)
  const expires = pick(certification.expires, lang)
  const verifyNote = pick(certification.verifyNote, lang)
  const isInPreparation = certification.status === 'in-preparation'

  return (
    <li id={`certificazione-${certification.id}`} className="certification-card">
      <a
        className="certification-card__preview"
        href={certification.pdf}
        target="_blank"
        rel="noreferrer"
        aria-label={`${t.certifications.openPdf}: ${name}`}
      >
        {certification.preview ? (
          <img
            src={certification.preview}
            alt=""
            loading="lazy"
            width={certification.previewWidth}
            height={certification.previewHeight}
          />
        ) : (
          <span className="certification-card__preview-placeholder" aria-hidden="true" />
        )}
      </a>

      <div className="certification-card__body">
        {isInPreparation && <p className="certification-card__status">{t.certifications.inPreparation}</p>}
        <h3 className="certification-card__name">{name}</h3>
        <p className="certification-card__issuer">{issuer}</p>
        {issued && (
          <p className="certification-card__dates">
            {t.certifications.issued} {issued}
            {expires ? ` · ${t.certifications.expires} ${expires}` : ''}
          </p>
        )}
        {verifyNote && <p className="certification-card__note">{verifyNote}</p>}

        <div className="certification-card__actions">
          <a href={certification.pdf} target="_blank" rel="noreferrer">
            {t.certifications.openPdf}
          </a>
          <a href={certification.pdf} download>
            {t.certifications.download}
          </a>
          {certification.verifyUrl ? (
            <a href={certification.verifyUrl} target="_blank" rel="noreferrer">
              {t.certifications.verify}
            </a>
          ) : (
            <span className="certification-card__verify-placeholder">{t.certifications.verifyUnavailable}</span>
          )}
        </div>
      </div>
    </li>
  )
}
