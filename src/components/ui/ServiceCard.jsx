// src/components/ui/ServiceCard.jsx
// Tarea 1: Componente de tarjeta de servicio reutilizable
// Props: service (objeto), onContact (función callback)

export default function ServiceCard({ service, onContact }) {
  function handleContact() {
    onContact?.(service.slug)
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <article
      className="service-card"
      aria-label={`Servicio: ${service.title}`}
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && handleContact()}
    >
      {/* Imagen con lazy loading */}
      <div className="service-card__image-wrap">
        <img
          src={service.image}
          alt={`Imagen representativa de ${service.title}`}
          className="service-card__image"
          loading="lazy"
          width={600}
          height={340}
        />
        <span className="service-card__categoria" aria-label="Categoría">
          {service.categoria}
        </span>
      </div>

      {/* Contenido */}
      <div className="service-card__body">
        <div className="service-card__icon" aria-hidden="true">{service.icon}</div>
        <h3 className="service-card__title">{service.title}</h3>
        <p className="service-card__desc">{service.description}</p>

        {/* Botón que pre-rellena el campo servicio en el formulario */}
        <button
          className="btn btn-primary service-card__cta"
          onClick={handleContact}
          aria-label={`Contactar para el servicio: ${service.title}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 1.18 2 2 0 012.08 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.46-.46a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
          </svg>
          Contáctanos
        </button>
      </div>

      <style>{`
        .service-card {
          background: var(--color-surface); border-radius: var(--radius-md);
          overflow: hidden; box-shadow: var(--shadow-sm);
          transition: transform var(--transition), box-shadow var(--transition);
          display: flex; flex-direction: column; height: 100%;
        }
        .service-card:hover, .service-card:focus-within {
          transform: translateY(-6px); box-shadow: var(--shadow-lg);
        }
        .service-card__image-wrap { position: relative; aspect-ratio: 16/9; overflow: hidden; }
        .service-card__image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .service-card:hover .service-card__image { transform: scale(1.05); }
        .service-card__categoria {
          position: absolute; top: var(--space-sm); right: var(--space-sm);
          background: var(--color-secondary); color: white;
          font-size: 0.75rem; font-weight: 600; letter-spacing: 0.05em;
          text-transform: uppercase; padding: 0.3rem 0.75rem; border-radius: 999px;
        }
        .service-card__body { padding: var(--space-md); display: flex; flex-direction: column; flex: 1; gap: var(--space-xs); }
        .service-card__icon { font-size: 2rem; margin-bottom: var(--space-xs); }
        .service-card__title { font-size: 1.2rem; color: var(--color-primary); margin-bottom: 0; }
        .service-card__desc { color: var(--color-text-muted); font-size: 0.9rem; line-height: 1.6; flex: 1; margin-bottom: var(--space-sm); }
        .service-card__cta { align-self: flex-start; margin-top: auto; }
      `}</style>
    </article>
  )
}
