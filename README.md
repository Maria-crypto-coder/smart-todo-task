# Smart TODO App

Una app de tareas con autenticación de usuarios, backend real y diseño moderno.

## Características

- 🔐 Autenticación de usuarios (Clerk)
- 💾 **Backend con base de datos real (Supabase)**
- 🔄 **Sincronización entre dispositivos**
- ✅ Agregar, editar y eliminar tareas
- 🎨 Diseño moderno con animaciones
- 🌙 Dark mode automático
- 📱 Responsive (funciona en móvil)
- 🎯 Filtros (todas, activas, completadas)
- ⚡ Rápido y fluido con optimistic updates
- 🛡️ Seguro (Row Level Security)

## Setup rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
# Copia .env.local.example a .env.local y agrega tus keys

# 3. Configurar Supabase
# Ver SUPABASE_SETUP.md para instrucciones detalladas

# 4. Ejecutar
npm run dev
```

Ver [SETUP.md](SETUP.md) y [SUPABASE_SETUP.md](SUPABASE_SETUP.md) para instrucciones detalladas.

## Stack

- **Frontend:** Next.js 16, React 19, TypeScript
- **Estilos:** Tailwind CSS
- **Autenticación:** Clerk
- **Base de datos:** Supabase (PostgreSQL)
- **Iconos:** Lucide React
- **Animaciones:** Framer Motion

## Estructura

```
src/
├── app/
│   ├── api/
│   │   └── todos/
│   │       ├── route.ts          # GET, POST
│   │       └── [id]/route.ts     # PATCH, DELETE
│   ├── layout.tsx                # layout con Clerk
│   └── page.tsx                  # página principal
├── components/
│   ├── Header.tsx                # header con botón de usuario
│   ├── TodoList.tsx              # lista de tareas
│   ├── TodoItem.tsx              # cada tarea
│   ├── TodoForm.tsx              # formulario
│   └── TodoFilters.tsx           # filtros
├── hooks/
│   └── useTodos.ts               # lógica con API calls
├── lib/
│   ├── supabase.ts               # cliente de Supabase
│   └── migrate-localStorage.ts   # script de migración
└── types/
    └── todo.ts                   # tipos TypeScript
```

## Características Técnicas

### Backend API
- **GET /api/todos** - Obtener todas las tareas del usuario
- **POST /api/todos** - Crear nueva tarea
- **PATCH /api/todos/[id]** - Actualizar tarea
- **DELETE /api/todos/[id]** - Eliminar tarea

### Seguridad
- Autenticación con Clerk
- Row Level Security en Supabase
- Validación de userId en cada request
- Solo el usuario puede ver/modificar sus tareas

### UX Optimizada
- **Optimistic updates:** La UI se actualiza instantáneamente
- **Error handling:** Manejo robusto de errores con retry
- **Loading states:** Indicadores de carga claros
- **Offline-first:** Las acciones se revierten si fallan

## Mejoras vs versión anterior

- ✅ **Backend real con PostgreSQL**
- ✅ **Sincronización entre dispositivos**
- ✅ **Persistencia real de datos**
- ✅ Autenticación de usuarios
- ✅ Diseño mucho más bonito
- ✅ Animaciones suaves
- ✅ Iconos modernos
- ✅ Header con perfil de usuario
- ✅ Mejor UX en general
- ✅ Pantalla de bienvenida
- ✅ Error handling robusto

## Roadmap

### Próximas mejoras
- [ ] Categorías y etiquetas
- [ ] Fechas de vencimiento
- [ ] Sistema de prioridades
- [ ] Búsqueda avanzada
- [ ] Subtareas
- [ ] Drag & drop
- [ ] Estadísticas y productividad
- [ ] Compartir tareas
- [ ] Exportar/importar datos
- [ ] PWA completa

## Scripts

```bash
npm run dev      # desarrollo
npm run build    # build
npm start        # producción
npm run lint     # linter
```

## Migración desde localStorage

Si tenías tareas en la versión anterior (localStorage), puedes migrarlas:

1. Abre la consola del navegador (F12)
2. Ejecuta: `await window.migrateLocalStorage()`
3. Tus tareas se migrarán automáticamente

## Desplegar

Ver [DEPLOYMENT.md](DEPLOYMENT.md) para opciones de despliegue.

### Vercel (Recomendado)
```bash
npm i -g vercel
vercel
```

**Variables de entorno requeridas:**
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Contribuir

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

---

Hecho con ❤️ usando Next.js + Clerk + Supabase
