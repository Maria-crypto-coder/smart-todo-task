# TODO: Categorías, Fechas y Prioridades

## 📋 Plan de Implementación

**Tiempo Estimado Total:** 2-3 horas
**Features:** Categorías, Fechas de Vencimiento, Prioridades, Tags

---

## Fase 1: Base de Datos y Backend (30-40 min) ✅ COMPLETADA

### 1.1 Base de Datos ✅
- [x] Ejecutar SQL en Supabase para agregar columnas:
  - [x] `category` (TEXT)
  - [x] `tags` (TEXT[])
  - [x] `priority` (TEXT con CHECK)
  - [x] `due_date` (TIMESTAMPTZ)
- [x] Crear índices para performance
- [x] Crear tabla `categories`
- [x] Actualizar valores por defecto para tareas existentes

### 1.2 TypeScript Types ✅
- [x] Actualizar `src/types/todo.ts`:
  - [x] Agregar type `Priority`
  - [x] Agregar interface `Category`
  - [x] Actualizar interface `Todo` con nuevos campos
  - [x] Agregar interface `TodoFilters` avanzada
  - [x] Agregar types para responses de categorías

### 1.3 Backend API ✅
- [x] Actualizar `src/app/api/todos/route.ts`:
  - [x] GET: Agregar filtros (category, priority, tags, date)
  - [x] POST: Aceptar nuevos campos
  - [x] Validar valores de priority
- [x] Actualizar `src/app/api/todos/[id]/route.ts`:
  - [x] PATCH: Permitir actualizar nuevos campos
- [x] Crear `src/app/api/categories/route.ts`:
  - [x] GET: Listar categorías del usuario
  - [x] POST: Crear nueva categoría
- [x] Crear `src/app/api/categories/[id]/route.ts`:
  - [x] PATCH: Actualizar categoría
  - [x] DELETE: Eliminar categoría

### 1.4 Testing Backend
- [ ] Probar crear tarea con category, priority, due_date, tags
- [ ] Probar actualizar campos
- [ ] Probar filtros
- [ ] Probar API de categorías

---

## Fase 2: Componentes Base (40-50 min)

### 2.1 Selectores
- [ ] Crear `src/components/CategorySelector.tsx`:
  - [ ] Dropdown con categorías
  - [ ] Mostrar color e icono
  - [ ] Opción "Crear nueva categoría"
  - [ ] Modal para crear categoría
- [ ] Crear `src/components/PrioritySelector.tsx`:
  - [ ] Botones o dropdown para Alta/Media/Baja
  - [ ] Indicadores visuales con colores
  - [ ] Iconos para cada prioridad
- [ ] Crear `src/components/DatePicker.tsx`:
  - [ ] Input de fecha nativo o librería
  - [ ] Botones rápidos (Hoy, Mañana, Esta semana)
  - [ ] Opción para limpiar fecha
  - [ ] Formato amigable de fecha
- [ ] Crear `src/components/TagInput.tsx`:
  - [ ] Input para agregar tags
  - [ ] Mostrar tags como chips
  - [ ] Botón X para eliminar tag
  - [ ] Sugerencias de tags existentes

### 2.2 Badges e Indicadores
- [ ] Crear `src/components/CategoryBadge.tsx`:
  - [ ] Badge con color de categoría
  - [ ] Mostrar icono si existe
  - [ ] Tamaño pequeño para lista
- [ ] Crear `src/components/PriorityBadge.tsx`:
  - [ ] Badge con color según prioridad
  - [ ] Icono o texto (Alta/Media/Baja)
  - [ ] Variantes de tamaño
- [ ] Crear `src/components/DueDateIndicator.tsx`:
  - [ ] Mostrar fecha formateada
  - [ ] Color según urgencia:
    - [ ] Rojo: Vencida
    - [ ] Naranja: Hoy
    - [ ] Amarillo: Esta semana
    - [ ] Verde: Más de una semana
  - [ ] Icono de calendario

---

## Fase 3: Integración (30-40 min)

### 3.1 Actualizar Componentes Existentes
- [ ] Actualizar `src/components/TodoForm.tsx`:
  - [ ] Agregar CategorySelector
  - [ ] Agregar PrioritySelector
  - [ ] Agregar DatePicker
  - [ ] Agregar TagInput
  - [ ] Actualizar estado del formulario
  - [ ] Validación de campos
- [ ] Actualizar `src/components/TodoItem.tsx`:
  - [ ] Mostrar CategoryBadge
  - [ ] Mostrar PriorityBadge
  - [ ] Mostrar DueDateIndicator
  - [ ] Mostrar tags
  - [ ] Modo edición para todos los campos
  - [ ] Layout responsive

### 3.2 Hooks
- [ ] Actualizar `src/hooks/useTodos.ts`:
  - [ ] addTodo: Incluir nuevos campos
  - [ ] editTodo: Actualizar todos los campos
  - [ ] Agregar filtros avanzados
  - [ ] Agregar ordenamiento (por prioridad, fecha)
- [ ] Crear `src/hooks/useCategories.ts`:
  - [ ] fetchCategories
  - [ ] addCategory
  - [ ] editCategory
  - [ ] deleteCategory
  - [ ] Loading y error states

---

## Fase 4: Filtros Avanzados (20-30 min)

### 4.1 Componente de Filtros
- [ ] Crear `src/components/TodoFiltersAdvanced.tsx`:
  - [ ] Filtro por estado (mantener actual)
  - [ ] Filtro por categoría
  - [ ] Filtro por prioridad
  - [ ] Filtro por tags
  - [ ] Filtro por rango de fechas
  - [ ] Botón "Limpiar filtros"
  - [ ] Contador de filtros activos

### 4.2 Integración de Filtros
- [ ] Actualizar `src/components/TodoList.tsx`:
  - [ ] Integrar TodoFiltersAdvanced
  - [ ] Aplicar filtros combinados
  - [ ] Mostrar contador de resultados
  - [ ] Mensaje cuando no hay resultados

### 4.3 Ordenamiento
- [ ] Agregar selector de ordenamiento:
  - [ ] Por fecha de creación
  - [ ] Por fecha de vencimiento
  - [ ] Por prioridad
  - [ ] Alfabético
  - [ ] Orden ascendente/descendente

---

## Fase 5: Testing y Refinamiento (20-30 min)

### 5.1 Testing Funcional
- [ ] Crear tarea con todos los campos
- [ ] Editar cada campo individualmente
- [ ] Probar todos los filtros
- [ ] Probar ordenamiento
- [ ] Crear y gestionar categorías
- [ ] Agregar y eliminar tags
- [ ] Verificar persistencia en DB

### 5.2 Testing UI/UX
- [ ] Responsive en móvil
- [ ] Animaciones suaves
- [ ] Loading states
- [ ] Error handling
- [ ] Validación de formularios
- [ ] Accesibilidad (keyboard navigation)

### 5.3 Refinamiento
- [ ] Ajustar colores y espaciado
- [ ] Mejorar mensajes de error
- [ ] Optimizar performance
- [ ] Agregar tooltips donde sea necesario
- [ ] Pulir animaciones

### 5.4 Documentación
- [ ] Actualizar README.md
- [ ] Crear FEATURES.md con guía de uso
- [ ] Actualizar CHANGELOG.md
- [ ] Screenshots de nuevas features

### 5.5 Deployment
- [ ] Commit y push a GitHub
- [ ] Verificar build local
- [ ] Deploy a Railway
- [ ] Testing en producción
- [ ] Verificar que todo funciona

---

## 📊 Progreso

**Fase 1:** ✅✅✅⬜⬜ 3/4 (75% - Backend API completo)
**Fase 2:** ⬜⬜⬜⬜⬜⬜⬜ 0/7
**Fase 3:** ⬜⬜⬜ 0/3
**Fase 4:** ⬜⬜⬜ 0/3
**Fase 5:** ⬜⬜⬜⬜⬜ 0/5

**Total:** 3/23 tareas completadas (13%)

---

## 🎯 Próximo Paso

**Fase 1.4:** Testing del Backend (opcional antes de continuar)
**Fase 2.1:** Crear componentes de selectores (CategorySelector, PrioritySelector, DatePicker, TagInput)

Archivos creados/actualizados en Fase 1:
- ✅ `src/types/todo.ts` - Types actualizados
- ✅ `src/app/api/todos/route.ts` - GET y POST con nuevos campos
- ✅ `src/app/api/todos/[id]/route.ts` - PATCH y DELETE actualizados
- ✅ `src/app/api/categories/route.ts` - API de categorías (GET, POST)
- ✅ `src/app/api/categories/[id]/route.ts` - API de categorías (PATCH, DELETE)

¿Listo para continuar con los componentes?
