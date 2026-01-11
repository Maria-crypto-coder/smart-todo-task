# 🚀 Setup de Supabase

## Paso 1: Obtener las credenciales

1. Ve a tu proyecto en Supabase: https://supabase.com/dashboard
2. En el menú lateral, ve a **Settings** → **API**
3. Copia las siguientes credenciales:
   - **Project URL** (ejemplo: `https://xxxxx.supabase.co`)
   - **anon/public key** (la key que dice "anon" o "public")

## Paso 2: Agregar al archivo .env.local

Crea o edita el archivo `.env.local` en la raíz del proyecto y agrega:

```env
# Tus keys de Clerk (ya las tienes)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=tu_clerk_key
CLERK_SECRET_KEY=tu_clerk_secret

# Nuevas keys de Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

## Paso 3: Crear la tabla en Supabase

1. En tu proyecto de Supabase, ve a **SQL Editor**
2. Crea una nueva query
3. Copia y pega este SQL:

```sql
-- Crear tabla de todos
CREATE TABLE todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para búsquedas rápidas por usuario
CREATE INDEX idx_todos_user_id ON todos(user_id);

-- Habilitar Row Level Security
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios solo pueden ver sus propias tareas
CREATE POLICY "Users can view their own todos"
  ON todos
  FOR SELECT
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Política: Los usuarios solo pueden insertar sus propias tareas
CREATE POLICY "Users can insert their own todos"
  ON todos
  FOR INSERT
  WITH CHECK (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Política: Los usuarios solo pueden actualizar sus propias tareas
CREATE POLICY "Users can update their own todos"
  ON todos
  FOR UPDATE
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Política: Los usuarios solo pueden eliminar sus propias tareas
CREATE POLICY "Users can delete their own todos"
  ON todos
  FOR DELETE
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');
```

4. Haz clic en **Run** para ejecutar el SQL

## Paso 4: Verificar

1. Ve a **Table Editor** en Supabase
2. Deberías ver la tabla `todos` creada
3. La tabla estará vacía por ahora (es normal)

## ✅ Listo

Una vez completados estos pasos, avísame para continuar con la implementación del código.

---

**Nota:** El archivo `.env.local` NO debe subirse a Git (ya está en .gitignore)
