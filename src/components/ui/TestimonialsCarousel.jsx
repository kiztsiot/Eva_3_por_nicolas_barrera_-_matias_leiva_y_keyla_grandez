// src/components/ui/TestimonialsCarousel.jsx
// Tarea 2: Carrusel de testimonios accesible y responsive
import { useState, useEffect, useRef, useCallback } from 'react'

const INTERVAL_MS = 5000

export default function TestimonialsCarousel({ items = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef(null)

  const next = useCallback(() => {
    setCurrentIndex(i => (i + 1) % items.length)
  }, [items.length])

  const prev = useCallback(() => {
    setCurrentIndex(i => (i - 1 + items.length) % items.length)
  }, [items.length])

  function goTo(i) { setCurrentIndex(i) }

  function startAutoPlay() {
    intervalRef.current = setInterval(next, INTERVAL_MS)
  }
  function pause()  { clearInterval(intervalRef.current) }
  function resume() { startAutoPlay() }

  useEffect(() => {
    startAutoPlay()
    function handleKeydown(e) {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft')  prev()
    }
    window.addEventListener('keydown', handleKeydown)
    return () => {
      clearInterval(intervalRef.current)
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [next, prev])

  if (!items.length) return null

  return (
    <section
      className="carousel"
      aria-label="Testimonios de clientes"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* Track deslizante */}
      <div
        className="carousel__track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        aria-live="polite"
        aria-atomic="true"
      >
        {items.map((item, i) => (
          <article
            key={item.id}
            className="carousel__slide"
            aria-hidden={i !== currentIndex}
            aria-label={`Testimonio ${i + 1} de ${items.length}: ${item.name}`}
          >
            {/* Estrellas */}
            <div className="carousel__stars" role="img" aria-label={`${item.rating} de 5 estrellas`}>
              {[1,2,3,4,5].map(n => (
                <span key={n} className={n <= item.rating ? 'active' : ''}>★</span>
              ))}
            </div>

            <blockquote className="carousel__quote">
              <p>"{item.texto}"</p>
              <footer>
                <div className="carousel__avatar" aria-hidden="true">{item.avatar}</div>
                <cite>
                  <strong>{item.name}</strong>
                  <span>{item.empresa}</span>
                </cite>
              </footer>
            </blockquote>
          </article>
        ))}
      </div>

      {/* Controles */}
      <nav className="carousel__controls" aria-label="Controles del carrusel">
        <button className="carousel__btn" onClick={prev} aria-label="Testimonio anterior" disabled={items.length <= 1}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div className="carousel__dots" role="tablist" aria-label="Seleccionar testimonio">
          {items.map((_, i) => (
            <button
              key={i}
              role="tab"
              className={`carousel__dot${i === currentIndex ? ' active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Ir al testimonio ${i + 1}`}
              aria-selected={i === currentIndex}
            />
          ))}
        </div>

        <button className="carousel__btn" onClick={next} aria-label="Siguiente testimonio" disabled={items.length <= 1}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </nav>

      <style>{`
        .carousel { position: relative; overflow: hidden; border-radius: var(--radius-lg); background: var(--color-primary); padding: var(--space-xl) var(--space-lg); }
        .carousel__track { display: flex; transition: transform 0.5s cubic-bezier(0.4,0,0.2,1); }
        .carousel__slide { min-width: 100%; padding: 0 var(--space-md); }
        .carousel__stars { display: flex; gap: 4px; margin-bottom: var(--space-md); font-size: 1.4rem; color: rgba(255,255,255,0.3); }
        .carousel__stars span.active { color: var(--color-secondary); }
        .carousel__quote { border: none; padding: 0; font-style: normal; }
        .carousel__quote p { font-family: var(--font-display); font-size: clamp(1.1rem,2.5vw,1.4rem); color: white; line-height: 1.6; margin-bottom: var(--space-lg); }
        .carousel__quote footer { display: flex; align-items: center; gap: var(--space-sm); }
        .carousel__avatar { width: 48px; height: 48px; border-radius: 50%; background: var(--color-secondary); color: white; font-weight: 700; font-size: 0.9rem; display: grid; place-items: center; flex-shrink: 0; }
        .carousel__quote cite { font-style: normal; display: flex; flex-direction: column; }
        .carousel__quote cite strong { color: white; font-size: 1rem; }
        .carousel__quote cite span { color: rgba(255,255,255,0.6); font-size: 0.85rem; }
        .carousel__controls { display: flex; align-items: center; justify-content: center; gap: var(--space-sm); margin-top: var(--space-lg); }
        .carousel__btn { background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.2); color: white; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; display: grid; place-items: center; transition: var(--transition); }
        .carousel__btn:hover:not(:disabled) { background: var(--color-secondary); border-color: var(--color-secondary); }
        .carousel__btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .carousel__dots { display: flex; gap: 8px; }
        .carousel__dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.3); border: none; cursor: pointer; transition: var(--transition); padding: 0; }
        .carousel__dot.active { background: var(--color-secondary); width: 24px; border-radius: 4px; }
        @media (max-width: 768px) { .carousel { padding: var(--space-lg) var(--space-sm); } }
      `}</style>
    </section>
  )
}
