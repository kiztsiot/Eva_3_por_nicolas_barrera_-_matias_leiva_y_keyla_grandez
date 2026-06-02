// src/components/sections/ContactSection.jsx
// Tarea 6: Formulario de contacto centrado en el usuario
// Tarea 10: Validación cliente + honeypot anti-bots
import { useState, useEffect } from 'react'
import { useContactForm } from '@/hooks/useApi.js'
import { services } from '@/data/services.js'

const SERVICE_OPTIONS = services.map(s => ({ value: s.slug, label: s.title }))

export default function ContactSection({ selectedService }) {
  const { form, errors, sending, success, updateField, setService, submit, reset } = useContactForm()
  const [honeypot, setHoneypot] = useState('')

  // Pre-rellenar servicio cuando viene desde ServiceCard
  useEffect(() => {
    if (selectedService) setService(selectedService)
  }, [selectedService])

  async function handleSubmit(e) {
    e.preventDefault()
    await submit(honeypot)
  }

  if (success) {
    return (
      <section id="contacto" className="section contact-section" aria-labelledby="contacto-titulo">
        <div className="container">
          <div className="contact-section__success" role="alert">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <h3>¡Mensaje enviado!</h3>
            <p>Nos pondremos en contacto contigo pronto.</p>
            <button className="btn btn-primary" onClick={reset}>Enviar otro mensaje</button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contacto" className="section contact-section" aria-labelledby="contacto-titulo">
      <div className="container contact-section__inner">

        {/* Info */}
        <div className="contact-section__info">
          <span className="contact-section__label">Háblanos</span>
          <h2 id="contacto-titulo">¿Cómo podemos ayudarte?</h2>
          <p>Completa el formulario y un asesor del Centro de Negocios Santiago se contactará contigo en menos de 48 horas hábiles.</p>
          <ul className="contact-section__details" aria-label="Datos de contacto">
            <li>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Manuel Rodríguez Sur 749, Santiago (Metro Toesca)</span>
            </li>
            <li>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <a href="mailto:centro.santiago@centrossercotec.cl">centro.santiago@centrossercotec.cl</a>
            </li>
          </ul>
        </div>

        {/* Formulario */}
        <div className="contact-section__form-wrap">
          <form className="contact-form" onSubmit={handleSubmit} noValidate aria-label="Formulario de contacto">

            {/* Honeypot anti-bots (invisible) */}
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="website">No llenar este campo</label>
              <input id="website" value={honeypot} onChange={e => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
            </div>

            <div className="form-row">
              {/* Nombre */}
              <div className={`form-group${errors.nombre ? ' error' : ''}`}>
                <label htmlFor="nombre">Nombre completo <span aria-hidden="true">*</span></label>
                <input
                  id="nombre" type="text" autoComplete="name"
                  value={form.nombre} onChange={e => updateField('nombre', e.target.value)}
                  aria-invalid={!!errors.nombre}
                  aria-describedby={errors.nombre ? 'error-nombre' : undefined}
                  placeholder="Juan Pérez"
                />
                {errors.nombre && <span id="error-nombre" className="form-error" role="alert">{errors.nombre}</span>}
              </div>

              {/* Email */}
              <div className={`form-group${errors.email ? ' error' : ''}`}>
                <label htmlFor="email">Correo electrónico <span aria-hidden="true">*</span></label>
                <input
                  id="email" type="email" autoComplete="email"
                  value={form.email} onChange={e => updateField('email', e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'error-email' : undefined}
                  placeholder="juan@empresa.cl"
                />
                {errors.email && <span id="error-email" className="form-error" role="alert">{errors.email}</span>}
              </div>
            </div>

            <div className="form-row">
              {/* Teléfono */}
              <div className="form-group">
                <label htmlFor="telefono">Teléfono (opcional)</label>
                <input id="telefono" type="tel" autoComplete="tel" value={form.telefono} onChange={e => updateField('telefono', e.target.value)} placeholder="+56 9 1234 5678" />
              </div>

              {/* Empresa */}
              <div className="form-group">
                <label htmlFor="empresa">Nombre de tu empresa</label>
                <input id="empresa" type="text" autoComplete="organization" value={form.empresa} onChange={e => updateField('empresa', e.target.value)} placeholder="Mi Empresa SpA" />
              </div>
            </div>

            {/* Servicio (pre-rellena desde ServiceCard) */}
            <div className="form-group">
              <label htmlFor="servicio">Servicio de interés</label>
              <select id="servicio" value={form.servicio} onChange={e => updateField('servicio', e.target.value)}>
                <option value="">Selecciona un servicio...</option>
                {SERVICE_OPTIONS.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            {/* Mensaje */}
            <div className={`form-group${errors.mensaje ? ' error' : ''}`}>
              <label htmlFor="mensaje">Mensaje <span aria-hidden="true">*</span></label>
              <textarea
                id="mensaje" rows={4}
                value={form.mensaje} onChange={e => updateField('mensaje', e.target.value)}
                aria-invalid={!!errors.mensaje}
                aria-describedby={errors.mensaje ? 'error-mensaje' : undefined}
                placeholder="Cuéntanos sobre tu empresa y en qué podemos ayudarte..."
              />
              {errors.mensaje && <span id="error-mensaje" className="form-error" role="alert">{errors.mensaje}</span>}
            </div>

            {errors.general && (
              <div className="form-error-general" role="alert">{errors.general}</div>
            )}

            <button type="submit" className="btn btn-primary contact-form__submit" disabled={sending} aria-busy={sending}>
              {sending && <span className="spinner" aria-hidden="true" />}
              {sending ? 'Enviando...' : 'Enviar mensaje'}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .contact-section { background: var(--color-surface); border-top: 1px solid var(--color-border); }
        .contact-section__inner { display: grid; grid-template-columns: 1fr 1.4fr; gap: var(--space-xl); align-items: start; }
        .contact-section__label { display: block; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--color-secondary); margin-bottom: var(--space-xs); }
        .contact-section__info h2 { margin-bottom: var(--space-sm); }
        .contact-section__info p { color: var(--color-text-muted); margin-bottom: var(--space-lg); }
        .contact-section__details { list-style: none; display: flex; flex-direction: column; gap: var(--space-sm); }
        .contact-section__details li { display: flex; align-items: flex-start; gap: var(--space-xs); color: var(--color-text-muted); font-size: 0.9rem; }
        .contact-section__details svg { flex-shrink: 0; margin-top: 2px; color: var(--color-primary); }
        .contact-section__details a { color: var(--color-primary); text-decoration: underline; }
        .contact-form { display: flex; flex-direction: column; gap: var(--space-sm); background: var(--color-bg); padding: var(--space-lg); border-radius: var(--radius-md); border: 1px solid var(--color-border); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-sm); }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group label { font-size: 0.85rem; font-weight: 500; color: var(--color-text); }
        .form-group label span { color: #c0392b; }
        .form-group input, .form-group select, .form-group textarea { padding: 0.65rem 0.9rem; border: 1.5px solid var(--color-border); border-radius: var(--radius-sm); font-family: var(--font-body); font-size: 0.9rem; background: var(--color-surface); color: var(--color-text); transition: border-color var(--transition); width: 100%; }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(27,58,107,0.1); }
        .form-group.error input, .form-group.error textarea { border-color: #c0392b; }
        textarea { resize: vertical; min-height: 100px; }
        .form-error { font-size: 0.8rem; color: #c0392b; font-weight: 500; }
        .form-error-general { padding: var(--space-xs) var(--space-sm); background: #fde8e8; border: 1px solid #f5c6c6; border-radius: var(--radius-sm); color: #c0392b; font-size: 0.85rem; }
        .contact-form__submit { width: 100%; justify-content: center; font-size: 1rem; padding: 0.85rem; }
        .contact-form__submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.4); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .contact-section__success { text-align: center; padding: var(--space-xl) var(--space-lg); background: var(--color-bg); border-radius: var(--radius-md); border: 1px solid var(--color-border); max-width: 480px; margin: 0 auto; }
        .contact-section__success svg { color: #27ae60; margin: 0 auto var(--space-sm); }
        .contact-section__success h3 { margin-bottom: var(--space-xs); }
        .contact-section__success p { color: var(--color-text-muted); margin-bottom: var(--space-md); }
        @media (max-width: 900px) { .contact-section__inner { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .form-row { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
