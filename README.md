# Smart TODO App

Una app de tareas con autenticación de usuarios y diseño moderno.

## Características

- 🔐 Autenticación de usuarios (Clerk)
- ✅ Agregar, editar y eliminar tareas
- 🎨 Diseño moderno con animaciones
- 🌙 Dark mode automático
- 📱 Responsive (funciona en móvil)
- 💾 Guarda tus tareas por usuario
- 🎯 Filtros (todas, activas, completadas)
- ⚡ Rápido y fluido

## Setup rápido

```bash
# Instalar dependencias
npm install

# Configurar Clerk (ver SETUP.md)
# Crear .env.local con tus keys

# Ejecutar
npm run dev
```

Ver [SETUP.md](SETUP.md) para instrucciones detalladas.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Clerk (autenticación)
- Lucide Icons

## Estructura

```
src/
├── app/
│   ├── layout.tsx        # layout con Clerk
│   └── page.tsx          # página principal
├── components/
│   ├── Header.tsx        # header con botón de usuario
│   ├── TodoList.tsx      # lista de tareas
│   ├── TodoItem.tsx      # cada tarea
│   ├── TodoForm.tsx      # formulario
│   └── TodoFilters.tsx   # filtros
├── hooks/
│   └── useTodos.ts       # lógica
└── types/
    └── todo.ts           # tipos
```

## Mejoras vs versión anterior

- ✅ Autenticación de usuarios
- ✅ Diseño mucho más bonito
- ✅ Animaciones suaves
- ✅ Iconos modernos
- ✅ Header con perfil de usuario
- ✅ Mejor UX en general
- ✅ Pantalla de bienvenida

## Para hacer

- [ ] Backend con base de datos
- [ ] Sincronización entre dispositivos
- [ ] Categorías y etiquetas
- [ ] Fechas de vencimiento
- [ ] Prioridades
- [ ] Compartir tareas

## Scripts

```bash
npm run dev      # desarrollo
npm run build    # build
npm start        # producción
npm run lint     # linter
```

## Desplegar

Ver [DEPLOYMENT.md](DEPLOYMENT.md) para opciones de despliegue.

La forma más fácil es con Vercel:
```bash
npm i -g vercel
vercel
```

No olvides agregar las variables de entorno de Clerk en Vercel.

---

Hecho con Next.js + Clerk
