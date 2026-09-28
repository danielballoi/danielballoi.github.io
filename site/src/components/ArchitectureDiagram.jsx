import { pick, useLanguage } from '../i18n/LanguageContext'
import './ArchitectureDiagram.css'

/**
 * Diagramma generico "blueprint": disegna in sequenza i nodi definiti nel
 * JSON del progetto (architecture.nodes), senza bisogno di un componente
 * o di un file SVG dedicato per ogni progetto.
 */
export default function ArchitectureDiagram({ nodes }) {
  const lang = useLanguage()
  if (!nodes || nodes.length === 0) return null

  return (
    <div className="architecture-diagram" role="img" aria-label={nodes.map((n) => pick(n.label, lang)).join(' → ')}>
      {nodes.map((node, i) => (
        <div className="architecture-diagram__item" key={node.id}>
          <div className="architecture-diagram__box" style={{ animationDelay: `${i * 120}ms` }}>
            {pick(node.label, lang)}
          </div>
          {i < nodes.length - 1 && (
            <span className="architecture-diagram__connector" aria-hidden="true" style={{ animationDelay: `${i * 120 + 60}ms` }}>
              →
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
