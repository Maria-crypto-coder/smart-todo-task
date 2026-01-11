# TODO: Implementación Backend con Supabase

## ✅ Completado por el Asistente
- [x] Crear proyecto en Supabase
- [x] Instalar dependencias de Supabase (`@supabase/supabase-js`)
- [x] Crear cliente de Supabase (`src/lib/supabase.ts`)
- [x] Crear API Routes completas:
  - [x] GET /api/todos (listar tareas)
  - [x] POST /api/todos (crear tarea)
  - [x] PATCH /api/todos/[id] (actualizar tarea)
  - [x] DELETE /api/todos/[id] (eliminar tarea)
- [x] Actualizar tipos TypeScript (`src/types/todo.ts`)
- [x] Actualizar hook useTodos con API calls
- [x] Implementar optimistic updates
- [x] Agregar error handling robusto
- [x] Agregar loading states en componentes
- [x] Crear script de migración de localStorage
- [x] Crear documentación completa:
  - [x] SUPABASE_SETUP.md
  - [x] BACKEND_IMPLEMENTATION.md
  - [x] Actualizar README.md
  - [x] .env.local.example

## 🔄 Pendiente (Debes completar TÚ)

### Paso 1: Configurar Supabase
1. Ve a tu proyecto en Supabase: https://supabase.com/dashboard
2. Ve a **Settings** → **API**
3. Copia:
   - Project URL
   - anon/public key

### Paso 2: Crear archivo .env.local
Crea el archivo `.env.local` en la raíz del proyecto con:
```env
# Tus keys de Clerk (ya las tienes)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=tu_clerk_key
CLERK_SECRET_KEY=tu_clerk_secret

# Nuevas keys de Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

### Paso 3: Crear tabla en Supabase
1. En Supabase, ve a **SQL Editor**
2. Crea nueva query
3. Copia y pega el SQL de `SUPABASE_SETUP.md`
4. Ejecuta (Run)

### Paso 4: Probar la aplicación
```bash
npm run dev
```

### Paso 5: (Opcional) Migrar datos de localStorage
Si tenías tareas guardadas:
1. Abre consola del navegador (F12)
2. Ejecuta: `await window.migrateLocalStorage()`

## 📚 Documentación Creada

- ✅ `SUPABASE_SETUP.md` - Guía paso a paso para configurar Supabase
- ✅ `BACKEND_IMPLEMENTATION.md` - Documentación técnica completa
- ✅ `.env.local.example` - Template de variables de entorno
- ✅ `README.md` - Actualizado con nueva información
- ✅ `src/lib/migrate-localStorage.ts` - Script de migración

## 🎯 Archivos Importantes

### Nuevos
- `src/lib/supabase.ts` - Cliente de Supabase
- `src/app/api/todos/route.ts` - API GET y POST
- `src/app/api/todos/[id]/route.ts` - API PATCH y DELETE
- `src/lib/migrate-localStorage.ts` - Migración de datos

### Modificados
- `src/types/todo.ts` - Tipos actualizados
- `src/hooks/useTodos.ts` - Ahora usa API en vez de localStorage
- `src/components/TodoList.tsx` - Error handling agregado
- `package.json` - Dependencia de Supabase agregada

## 🚀 Próximos Pasos (Después de configurar)

Una vez que funcione el backend, puedes implementar:
1. Categorías y etiquetas
2. Fechas de vencimiento
3. Sistema de prioridades
4. Búsqueda avanzada
5. Subtareas
6. Y más...

## 📝 Notas Técnicas

- **Base de datos:** Supabase (PostgreSQL)
- **Autenticación:** Clerk (ya configurado)
- **Seguridad:** Row Level Security por userId
- **UX:** Optimistic updates para respuesta instantánea
- **Error handling:** Retry automático y mensajes claros
- **Sincronización:** Automática entre dispositivos
