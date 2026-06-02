// src/App.jsx
// Componente raíz - integra todas las secciones de la landing page
import { useState } from 'react'
import AppNavbar            from '@/components/layout/AppNavbar.jsx'
import ServicesSection      from '@/components/sections/ServicesSection.jsx'
import ContactSection       from '@/components/sections/ContactSection.jsx'
import TestimonialsCarousel from '@/components/ui/TestimonialsCarousel.jsx'
import { useApi }           from '@/hooks/useApi.js'
import {
  testimonials as localTestimonials,
  faqs as localFaqs
} from '@/data/services.js'

export default function App() {
  // Servicio seleccionado desde ServiceCard → ContactSection
  const [selectedService, setSelectedService] = useState('')

  // Tarea 9: testimonios y FAQs desde API con fallback local
  const { data: testimonials } = useApi('testimonials', localTestimonials)
  const { data: faqs }         = useApi('faqs',         localFaqs)

  // FAQ accordion
  const [openFaq, setOpenFaq] = useState(null)
  function toggleFaq(id) { setOpenFaq(o => o === id ? null : id) }

  return (
    <div id="app">
      <AppNavbar />

      <main id="main" tabIndex={-1}>

        {/* ── Hero ── */}
        <section id="inicio" className="hero section" aria-labelledby="hero-titulo">
          <div className="container hero__inner">
            <div className="hero__content animate-in">
              <span className="hero__badge">Centro de Negocios Santiago · SERCOTEC</span>
              <h1 id="hero-titulo">
                Impulsamos el<br/>
                <em>crecimiento</em> de<br/>
                tu empresa
              </h1>
              <p className="hero__desc">
                Acompañamiento integral, capacitación y vinculación para micro, pequeñas y medianas
                empresas de Santiago. Gratuito y especializado.
              </p>
              <div className="hero__actions">
                <a href="#servicios" className="btn btn-primary">Ver servicios</a>
                <a href="#contacto"  className="btn btn-secondary">Contáctanos</a>
              </div>
            </div>
            <div className="hero__stats" aria-label="Estadísticas del Centro">
              <div className="stat-card"><strong>+1.500</strong><span>empresas acompañadas</span></div>
              <div className="stat-card"><strong>15+</strong><span>años de experiencia</span></div>
              <div className="stat-card"><strong>98%</strong><span>satisfacción de clientes</span></div>
            </div>
          </div>
        </section>

        {/* ── Nosotros ── */}
        <section id="nosotros" className="section nosotros-section" aria-labelledby="nosotros-titulo">
          <div className="container nosotros-inner">
            <div className="nosotros-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=80"
                alt="Equipo del Centro de Negocios Santiago colaborando"
                loading="lazy" width={700} height={500}
              />
            </div>
            <div className="nosotros-content">
              <span className="section-eyebrow">Quiénes somos</span>
              <h2 id="nosotros-titulo">Centro de Negocios Santiago de SERCOTEC</h2>
              <p>
                Somos una institución dedicada a ofrecer servicios integrales de apoyo y
                acompañamiento a las micro, pequeñas y medianas empresas, con un enfoque
                especializado en gestión, innovación y fortalecimiento de capacidades.
              </p>
              <p>
                Nuestro objetivo es garantizar el correcto funcionamiento, sostenibilidad
                y eficiencia de los negocios de nuestros clientes, brindando herramientas
                concretas para crecer con solidez.
              </p>
              <a href="#servicios" className="btn btn-primary">Conocer nuestros servicios</a>
            </div>
          </div>
        </section>

        {/* ── Servicios (consume API) ── */}
        <ServicesSection onSelectService={setSelectedService} />

        {/* ── Testimonios (consume API) ── */}
        <section id="testimonios" className="section" aria-labelledby="testimonios-titulo">
          <div className="container">
            <header className="section-title">
              <span>Lo que dicen de nosotros</span>
              <h2 id="testimonios-titulo">Testimonios</h2>
            </header>
            {testimonials && <TestimonialsCarousel items={testimonials} />}
          </div>
        </section>

        {/* ── FAQ (consume API) ── */}
        <section id="faq" className="section faq-section" aria-labelledby="faq-titulo">
          <div className="container">
            <header className="section-title">
              <span>Resolvemos tus dudas</span>
              <h2 id="faq-titulo">Preguntas Frecuentes</h2>
            </header>
            {faqs && (
              <dl className="faq-list">
                {faqs.map(item => (
                  <div key={item.id} className="faq-item">
                    <dt>
                      <button
                        className="faq-btn"
                        aria-expanded={openFaq === item.id}
                        aria-controls={`faq-ans-${item.id}`}
                        onClick={() => toggleFaq(item.id)}
                      >
                        {item.pregunta}
                        <svg
                          width="18" height="18" viewBox="0 0 24 24"
                          fill="none" stroke="currentColor" strokeWidth="2"
                          className={`faq-icon${openFaq === item.id ? ' rotated' : ''}`}
                          aria-hidden="true"
                        >
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </button>
                    </dt>
                    <dd
                      id={`faq-ans-${item.id}`}
                      className={`faq-answer${openFaq === item.id ? ' open' : ''}`}
                      hidden={openFaq !== item.id}
                    >
                      <p>{item.respuesta}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>

        {/* ── Contacto ── */}
        <ContactSection selectedService={selectedService} />

      </main>

      {/* Footer */}
      <footer className="footer" role="contentinfo">
        <div className="container footer__inner">
          <div className="footer__brand">
            <div className="navbar__logo-icon" style={{width:36,height:36,fontSize:'0.8rem'}}>CN</div>
            <div>
              <strong>Centro de Negocios Santiago</strong>
              <span>SERCOTEC</span>
            </div>
          </div>
          <p className="footer__copy">
            © {new Date().getFullYear()} Centro de Negocios Santiago · SERCOTEC.<br/>
            Manuel Rodríguez Sur 749, Santiago (Metro Toesca).
          </p>
          <nav aria-label="Redes sociales">
            <a href="https://www.facebook.com/centrodnsantiago" target="_blank" rel="noopener noreferrer" aria-label="Facebook del Centro de Negocios">
              Facebook
            </a>
          </nav>
        </div>
      </footer>

      <style>{`
        /* Hero */
        .hero { background: var(--color-bg); padding-top: calc(var(--space-2xl) + 72px); }
        .hero__inner { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-xl); align-items: center; }
        .hero__badge { display: inline-block; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-secondary); background: rgba(200,146,42,0.1); padding: 0.4rem 1rem; border-radius: 999px; margin-bottom: var(--space-sm); }
        .hero__content h1 { margin-bottom: var(--space-sm); }
        .hero__content h1 em { font-style: italic; color: var(--color-secondary); }
        .hero__desc { color: var(--color-text-muted); font-size: 1.1rem; max-width: 480px; margin-bottom: var(--space-lg); }
        .hero__actions { display: flex; gap: var(--space-sm); flex-wrap: wrap; }
        .hero__stats { display: grid; grid-template-columns: 1fr; gap: var(--space-sm); }
        .stat-card { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); text-align: center; box-shadow: var(--shadow-sm); }
        .stat-card strong { display: block; font-family: var(--font-display); font-size: 2rem; color: var(--color-primary); }
        .stat-card span { font-size: 0.85rem; color: var(--color-text-muted); }

        /* Nosotros */
        .nosotros-section { background: var(--color-surface); }
        .nosotros-inner { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-xl); align-items: center; }
        .nosotros-img-wrap img { border-radius: var(--radius-lg); width: 100%; object-fit: cover; }
        .nosotros-content { display: flex; flex-direction: column; gap: var(--space-sm); }
        .section-eyebrow { font-size: 0.8rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--color-secondary); }

        /* FAQ */
        .faq-section { background: var(--color-surface); }
        .faq-list { max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; gap: var(--space-xs); }
        .faq-item { border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden; }
        .faq-btn { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: var(--space-sm); padding: var(--space-md); background: none; border: none; cursor: pointer; font-family: var(--font-body); font-size: 1rem; font-weight: 600; color: var(--color-primary); text-align: left; transition: background var(--transition); }
        .faq-btn:hover { background: rgba(27,58,107,0.04); }
        .faq-icon { flex-shrink: 0; transition: transform var(--transition); color: var(--color-secondary); }
        .faq-icon.rotated { transform: rotate(180deg); }
        .faq-answer { padding: 0 var(--space-md) var(--space-md); }
        .faq-answer p { color: var(--color-text-muted); line-height: 1.7; margin: 0; }

        /* Footer */
        .footer { background: var(--color-primary); color: white; padding: var(--space-lg) 0; }
        .footer__inner { display: flex; align-items: center; justify-content: space-between; gap: var(--space-md); flex-wrap: wrap; }
        .footer__brand { display: flex; align-items: center; gap: var(--space-xs); }
        .footer__brand strong { display: block; font-size: 0.95rem; }
        .footer__brand span { font-size: 0.8rem; opacity: 0.7; }
        .footer__copy { font-size: 0.8rem; opacity: 0.7; text-align: center; }
        .footer a { color: rgba(255,255,255,0.7); font-size: 0.9rem; transition: color var(--transition); }
        .footer a:hover { color: var(--color-secondary); }
        .navbar__logo-icon { background: rgba(255,255,255,0.2); color: white; border-radius: var(--radius-sm); display: grid; place-items: center; font-weight: 700; letter-spacing: 0.05em; }

        /* Responsive */
        @media (max-width: 900px) {
          .hero__inner, .nosotros-inner { grid-template-columns: 1fr; }
          .hero { text-align: center; }
          .hero__actions { justify-content: center; }
          .hero__desc { margin: 0 auto var(--space-lg); }
          .hero__stats { grid-template-columns: repeat(3,1fr); }
          .nosotros-img-wrap { order: -1; }
        }
        @media (max-width: 640px) {
          .hero__stats { grid-template-columns: 1fr; }
          .footer__inner { flex-direction: column; text-align: center; }
        }
      `}</style>
    </div>
  )
}
