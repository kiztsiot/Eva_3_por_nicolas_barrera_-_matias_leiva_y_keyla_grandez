# Centro de Negocios Santiago · SERCOTEC
Landing page desarrollada con **React + Vite** para el Centro de Negocios Santiago de SERCOTEC.

## Estructura del proyecto
```
src/
├── components/
│   ├── layout/     AppNavbar.jsx
│   ├── sections/   ServicesSection.jsx · ContactSection.jsx
│   └── ui/         ServiceCard.jsx · TestimonialsCarousel.jsx
├── hooks/          useApi.js · useContactForm.js
├── data/           services.js
└── styles/         main.css
```

## Instalación
```bash
npm install
cp .env.example .env
npm run dev:full   # Levanta API (puerto 3001) + React (puerto 5173)
```

## Componentes principales

### ServiceCard
```jsx
<ServiceCard service={serviceObj} onContact={(slug) => console.log(slug)} />
```

### TestimonialsCarousel
```jsx
<TestimonialsCarousel items={testimonialsList} />
```

### ContactSection
```jsx
<ContactSection selectedService="acompanamiento-preventivo" />
```

## Ramas Git por integrante
- `feature/service-card` — Integrante 1
- `feature/testimonials-carousel` — Integrante 1
- `feature/navbar` — Integrante 1
- `feature/services-section` — Integrante 2
- `feature/api-integration` — Integrante 2
- `feature/contact-form` — Integrante 3
- `docs/readme-retrospectiva` — Integrante 3
