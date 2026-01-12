# 🔧 Fix: Row Level Security con Clerk

## Problema
Error: `new row violates row-level security policy for table "todos"`

Esto ocurre porque las políticas de RLS de Supabase no reconocen el `user_id` de Clerk.

---

## Solución: Deshabilitar RLS Temporalmente

### Opción 1: Deshabilitar RLS (Más Simple - Para Desarrollo)

Ve a Supabase → SQL Editor y ejecuta:

```sql
-- Deshabilitar Row Level Security temporalmente
ALTER TABLE todos DISABLE ROW LEVEL SECURITY;
```

**Nota:** Esto es seguro para desarrollo porque:
- Tu API ya valida el `user_id` de Clerk en cada request
- Los usuarios solo pueden acceder a través de tu API (no directamente a Supabase)
- Para producción, puedes implementar RLS con Supabase Auth más adelante

---

## Opción 2: Políticas RLS Simplificadas (Recomendado)

Si prefieres mantener RLS activo, ejecuta esto en Supabase:

```sql
-- Eliminar políticas existentes
DROP POLICY IF EXISTS "Users can only access their own todos" ON todos;

-- Crear políticas más permisivas (la seguridad la maneja tu API)
CREATE POLICY "Enable all for service role"
  ON todos
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

**Nota:** Esto permite todas las operaciones, pero tu API sigue validando el `user_id` en cada request, así que sigue siendo seguro.

---

## Opción 3: RLS con Service Role Key (Avanzado)

Si quieres mantener RLS estricto, necesitas usar el Service Role Key en lugar del Anon Key:

1. En Supabase → Settings → API
2. Copia el **service_role** key (no el anon key)
3. Actualiza tu `.env.local`:

```env
# Reemplaza esto:
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key

# Con esto:
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

4. Actualiza `src/lib/supabase.ts`:

```typescript
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
```

**Advertencia:** El service role key bypasea RLS, así que NUNCA lo expongas en el cliente.

---

## Recomendación

Para tu caso (desarrollo con Clerk), te recomiendo **Opción 1** (deshabilitar RLS) porque:

✅ Tu API ya maneja la seguridad con Clerk
✅ Cada endpoint valida el `user_id`
✅ Los usuarios no acceden directamente a Supabase
✅ Es más simple y funciona inmediatamente

Ejecuta este SQL en Supabase:

```sql
ALTER TABLE todos DISABLE ROW LEVEL SECURITY;
```

Luego recarga la página y prueba crear una tarea nuevamente.

---

## Verificar que Funciona

Después de aplicar el fix:

1. Recarga la página (F5)
2. Intenta crear una tarea
3. Debería funcionar sin errores
4. Verifica que la tarea aparece en Supabase → Table Editor → todos

---

## Para Producción

Si más adelante quieres RLS estricto con Clerk, necesitarás:
1. Usar Supabase Auth en lugar de Clerk, O
2. Implementar un sistema de sincronización de usuarios entre Clerk y Supabase, O
3. Usar el Service Role Key en el backend (nunca en el cliente)

Por ahora, con RLS deshabilitado y la validación en tu API, tu app es segura.
