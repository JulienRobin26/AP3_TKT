import LigneAlerte from './LigneAlerte'

export default function ListeAlertes({
  alertes,
  classeNiveau,
  informationsOuvertes,
  onBasculerDescription,
  onModifierAlerte,
  onSupprimerAlerte,
}) {
  return (
    // Le niveau choisi pilote seulement le style de fond de la liste.
    <div className={`alerts-list ${classeNiveau}`}>
      {alertes.length === 0 && <p className="alerts-empty">Aucune alerte a afficher.</p>}

      {alertes.map((alerte) => (
        <LigneAlerte
          key={alerte.id_alr}
          alerte={alerte}
          estOuverte={Boolean(informationsOuvertes[alerte.id_alr])}
          onBasculerDescription={onBasculerDescription}
          onModifier={onModifierAlerte}
          onSupprimer={onSupprimerAlerte}
        />
      ))}
    </div>
  )
}
