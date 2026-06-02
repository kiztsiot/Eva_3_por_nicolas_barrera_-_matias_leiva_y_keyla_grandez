#  Retrospectiva del Equipo — Sprint Final
**Proyecto:** Landing Page Centro de Negocios Santiago · SERCOTEC  
**Fecha:** Junio 2026  
**Metodología:** Start / Stop / Continue (formato ágil)

---

##  Participantes

| Integrante | Rol en el proyecto |
|------------|-------------------|
| [Nombre 1] | Desarrollo de componentes UI |
| [Nombre 2] | Integración de API y CMS |
| [Nombre 3] | Estilos, accesibilidad y documentación |

---

##  ¿Qué salió bien? (Continue doing)

### Componentes reutilizables
Desde el inicio decidimos construir `ServiceCard.vue` y `TestimonialsCarousel.vue` como componentes independientes con `props` bien definidas. Esto nos permitió reutilizarlos en distintas secciones sin duplicar código.

### Uso de composables
Centralizar la lógica de fetch y validación en `useApi.js` fue muy efectivo. Cuando necesitamos cambiar el origen de los datos (de local a API real), solo modificamos el composable sin tocar los componentes.

### Convenciones de Git
Mantuvimos la convención `feat/fix/docs(scope): descripción` en todos los commits desde el comienzo. Esto hizo que el historial fuera legible y que los pull requests tuvieran contexto claro.

### Accesibilidad desde el diseño
Implementar atributos ARIA, roles semánticos y navegación por teclado desde el inicio (no como corrección posterior) ahorró tiempo y evitó refactorizaciones.

---

##  ¿Qué debemos dejar de hacer? (Stop doing)

### Trabajar directamente en `main`
En las primeras etapas del proyecto hubo commits directos a la rama `main` sin pasar por pull request. Esto generó conflictos y dificultó la revisión de código.

**Acción correctiva:** Proteger la rama `main` en GitHub (branch protection rules) para exigir PR con al menos 1 revisión aprobada.

### Dejar la documentación para el final
El `README.md` y los comentarios en el código se redactaron al cierre del proyecto. Esto hizo más difícil recordar decisiones de diseño y detalles de implementación.

**Acción correctiva:** Documentar cada componente al momento de crearlo, usando JSDoc y comentarios inline.

### Variables CSS duplicadas
Se detectaron algunas variables de color definidas en múltiples archivos. Esto generó inconsistencias visuales menores.

**Acción correctiva:** Consolidar todas las variables en `src/styles/main.css` y no redefinirlas en estilos scoped.

---

##  ¿Qué debemos empezar a hacer? (Start doing)

### Testing de componentes
No implementamos pruebas unitarias para los componentes Vue. En la próxima iteración incorporaremos **Vitest** + **Vue Test Utils** para testear al menos los componentes críticos (`ServiceCard`, `ContactSection`, `useContactForm`).

**Plan de acción:**
```bash
npm install -D vitest @vue/test-utils
```
- [ ] Test unitario para `useContactForm` (validación)
- [ ] Test de integración para `ServiceCard` (emit `contact`)
- [ ] Test de snapshot para `AppNavbar`

### CI/CD con GitHub Actions
No configuramos integración continua. En la siguiente iteración agregaremos un workflow que ejecute `npm run build` y los tests en cada pull request.

**Plan de acción:**
```yaml
# .github/workflows/ci.yml
name: CI
on: [pull_request]
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run build
      - run: npm run test
```

### Revisiones de código más estructuradas
Los pull requests se revisaron pero sin un checklist definido, lo que hizo que algunas cosas pasaran desapercibidas (variables sin usar, estilos inline, falta de atributos ARIA).

**Plan de acción:** Crear una plantilla de PR en `.github/pull_request_template.md`:
```markdown
## ¿Qué hace este PR?
## ¿Cómo se prueba?
## Checklist
- [ ] El código sigue las convenciones del proyecto
- [ ] Los componentes tienen atributos ARIA
- [ ] Las imágenes tienen alt descriptivo
- [ ] No hay console.log en producción
```

---

##  Métricas del Sprint

| Métrica | Valor |
|---------|-------|
| Componentes creados | 5 |
| Commits realizados | ~20 |
| Pull Requests | ~6 |
| Tareas completadas | 11/11 |
| Bugs encontrados en revisión | 3 (todos corregidos) |

---

##  Plan de Acción para la Próxima Iteración

| Prioridad | Acción | Responsable | Plazo estimado |
|-----------|--------|-------------|----------------|
| Alta | Configurar Vitest y escribir tests básicos | [Nombre 1] | Sprint 1 |
| Alta | Proteger rama `main` en GitHub | [Nombre 3] | Inmediato |
| Media | Implementar GitHub Actions (CI/CD) | [Nombre 2] | Sprint 1 |
| Media | Crear plantilla de Pull Request | [Nombre 3] | Sprint 1 |
| Baja | Migrar a CMS real (Strapi en producción) | [Nombre 1] | Sprint 2 |
| Baja | Agregar modo oscuro con CSS variables | [Nombre 2] | Sprint 2 |

---

##  Reflexión Final del Equipo

> *"El proyecto nos permitió aplicar de manera integrada todos los conceptos del framework: componentes reutilizables, composables, accesibilidad y consumo de API. El mayor aprendizaje fue entender que la calidad del código no solo se mide en funcionalidad, sino en mantenibilidad, documentación y trabajo colaborativo."*

---

*Instituto Profesional San Sebastián · Evaluación Sumativa U3 · T1 2026*
