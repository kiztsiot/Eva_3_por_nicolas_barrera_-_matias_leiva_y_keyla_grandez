// src/components/sections/ServicesSection.jsx
// Tarea 9: Sección "servicios" que consume datos de API dinámicamente
import ServiceCard from '@/components/ui/ServiceCard.jsx'
import { useApi } from '@/hooks/useApi.js'
import { services as localServices } from '@/data/services.js'

export default function ServicesSection({ onSelectService }) {
  const { data: serviceList, loading, error, refetch } = useApi('services', localServices)

  return (
    <section id="servicios" className="section services-section" aria-labelledby="servicios-titulo">
      <div className="container">
        <header className="section-title">
          <span>Lo que ofrecemos</span>
          <h2 id="servicios-titulo">Nuestros Servicios</h2>
          <p className="services-section__subtitle">
            Acompañamiento integral para que tu empresa crezca de manera sostenible.
          </p>
        </header>

        {/* Skeleton loader */}
        {loading && (
          <div className="services-section__loading" role="status" aria-live="polite">
            {[...Array(6)].map((_, i) => <div key={i} className="skeleton-card" aria-hidden="true" />)}
            <span className="sr-only">Cargando servicios...</span>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="services-section__error" role="alert">
            <p>No se pudieron cargar los servicios. Por favor intenta más tarde.</p>
            <button className="btn btn-primary" onClick={refetch}>Reintentar</button>
          </div>
        )}

        {/* Grilla */}
        {!loading && !error && serviceList && (
          <ul className="services-section__grid" role="list">
            {serviceList.map((service, i) => (
              <li
                key={service.id}
                className="animate-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <ServiceCard service={service} onContact={onSelectService} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <style>{`
        .services-section { background: var(--color-bg); }
        .services-section__subtitle { color: var(--color-text-muted); max-width: 540px; margin: var(--space-sm) auto 0; text-align: center; }
        .services-section__grid { list-style: none; display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: var(--space-md); }
        .services-section__loading { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: var(--space-md); }
        .skeleton-card { height: 380px; border-radius: var(--radius-md); background: linear-gradient(90deg,#e8e4de 25%,#f0ede8 50%,#e8e4de 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .services-section__error { text-align: center; color: #c0392b; padding: var(--space-xl); display: flex; flex-direction: column; align-items: center; gap: var(--space-sm); }
        @media (max-width: 640px) { .services-section__grid, .services-section__loading { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
