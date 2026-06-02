// src/components/layout/AppNavbar.jsx
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { href: '#inicio',      label: 'Inicio',      section: 'inicio' },
  { href: '#nosotros',    label: 'Nosotros',    section: 'nosotros' },
  { href: '#servicios',   label: 'Servicios',   section: 'servicios' },
  { href: '#testimonios', label: 'Testimonios', section: 'testimonios' },
  { href: '#faq',         label: 'FAQ',          section: 'faq' },
  { href: '#contacto',    label: 'Contacto',    section: 'contacto' },
]

export default function AppNavbar() {
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [isScrolled,    setIsScrolled]    = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 60)
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom > 100) {
            setActiveSection(link.section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <a href="#main" className="skip-link">Saltar al contenido principal</a>

      {/* Barra superior roja (estilo SERCOTEC) */}
      <div className="topbar">
        <div className="container topbar__inner">
          <span>Centro de Desarrollo de Negocios · Santiago</span>
          <a href="mailto:centro.santiago@centrossercotec.cl">centro.santiago@centrossercotec.cl</a>
        </div>
      </div>

      <header className={`navbar${isScrolled ? ' scrolled' : ''}`} role="banner">
        <div className="container navbar__inner">
          {/* Logo */}
          <a href="#inicio" className="navbar__logo" aria-label="Centro de Negocios Santiago SERCOTEC">
            <div className="navbar__logo-icon">
              <span>CN</span>
            </div>
            <div className="navbar__logo-text">
              <strong>Centro de Negocios</strong>
              <span>Santiago · SERCOTEC</span>
            </div>
          </a>

          {/* Nav desktop */}
          <nav className="navbar__nav" role="navigation" aria-label="Navegación principal">
            <ul className="navbar__menu" role="list">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`navbar__link${activeSection === link.section ? ' active' : ''}`}
                    aria-current={activeSection === link.section ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a href="#contacto" className="btn btn-gold navbar__cta">
            Contáctanos
          </a>

          <button
            className="navbar__toggle"
            onClick={() => setMenuOpen(o => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <span className={`hamburger${menuOpen ? ' open' : ''}`}>
              <span /><span /><span />
            </span>
          </button>
        </div>

        {menuOpen && (
          <nav id="mobile-menu" className="navbar__mobile" role="navigation" aria-label="Menú móvil">
            <ul role="list">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contacto" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }} onClick={() => setMenuOpen(false)}>
                  Contáctanos
                </a>
              </li>
            </ul>
          </nav>
        )}
      </header>

      <style>{`
        .skip-link { position: absolute; top: -100%; left: 1rem; background: var(--color-primary); color: white; padding: 0.5rem 1rem; border-radius: 0 0 4px 4px; font-weight: 600; z-index: 9999; transition: top 0.2s; }
        .skip-link:focus { top: 0; }

        /* Topbar roja */
        .topbar { background: var(--color-secondary); color: white; font-size: 0.78rem; padding: 0.4rem 0; }
        .topbar__inner { display: flex; justify-content: space-between; align-items: center; }
        .topbar a { color: white; opacity: 0.9; }
        .topbar a:hover { opacity: 1; text-decoration: underline; }

        /* Navbar */
        .navbar { position: sticky; top: 0; left: 0; right: 0; z-index: 1000; background: white; border-bottom: 2px solid var(--color-border); transition: var(--transition); }
        .navbar.scrolled { box-shadow: var(--shadow-md); border-bottom-color: var(--color-primary); }
        .navbar__inner { display: flex; align-items: center; gap: var(--space-md); height: 68px; }

        /* Logo */
        .navbar__logo { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
        .navbar__logo-icon { width: 42px; height: 42px; background: var(--color-primary); border-radius: 4px; display: grid; place-items: center; flex-shrink: 0; }
        .navbar__logo-icon span { color: white; font-weight: 800; font-size: 0.85rem; font-family: var(--font-display); letter-spacing: 0.05em; }
        .navbar__logo-text { display: flex; flex-direction: column; line-height: 1.25; }
        .navbar__logo-text strong { font-size: 0.9rem; color: var(--color-primary); font-family: var(--font-display); font-weight: 700; }
        .navbar__logo-text span { font-size: 0.72rem; color: var(--color-secondary); font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; }

        /* Nav links */
        .navbar__nav { flex: 1; }
        .navbar__menu { list-style: none; display: flex; justify-content: center; gap: 0; }
        .navbar__link { display: block; padding: 0.55rem 0.9rem; font-size: 0.85rem; font-family: var(--font-display); font-weight: 600; color: var(--color-text-muted); border-bottom: 3px solid transparent; transition: var(--transition); letter-spacing: 0.03em; }
        .navbar__link:hover { color: var(--color-primary); border-bottom-color: var(--color-secondary); }
        .navbar__link.active { color: var(--color-primary); border-bottom-color: var(--color-secondary); }

        .navbar__cta { font-size: 0.82rem; padding: 0.55rem 1.2rem; flex-shrink: 0; }
        .navbar__toggle { display: none; background: none; border: none; cursor: pointer; padding: 6px; margin-left: auto; }
        .hamburger { display: flex; flex-direction: column; gap: 5px; width: 24px; }
        .hamburger span { display: block; height: 2px; background: var(--color-primary); border-radius: 2px; transition: var(--transition); transform-origin: center; }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        .navbar__mobile { background: white; border-top: 2px solid var(--color-border); padding: var(--space-sm) var(--space-md) var(--space-md); }
        .navbar__mobile ul { list-style: none; display: flex; flex-direction: column; gap: 4px; }
        .navbar__mobile-link { display: block; padding: 0.7rem var(--space-sm); font-size: 0.95rem; font-family: var(--font-display); font-weight: 600; color: var(--color-text); border-radius: var(--radius-sm); transition: var(--transition); }
        .navbar__mobile-link:hover { background: rgba(27,51,102,0.06); color: var(--color-primary); }

        @media (max-width: 900px) { .navbar__nav, .navbar__cta { display: none; } .navbar__toggle { display: flex; } }
        @media (max-width: 480px) { .topbar__inner { flex-direction: column; gap: 2px; text-align: center; } }
      `}</style>
    </>
  )
}
