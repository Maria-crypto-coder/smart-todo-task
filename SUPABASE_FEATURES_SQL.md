# 🗄️ SQL para Nuevas Features: Categorías, Fechas y Prioridades

## Instrucciones

1. Ve a Supabase → https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a **SQL Editor**
4. Crea una nueva query
5. Copia y pega el SQL de abajo
6. Click en **Run** (o F5)

---

## 📝 SQL Completo

```sql
-- ============================================
-- PASO 1: Agregar nuevas columnas a tabla todos
-- ============================================

ALTER TABLE todos
ADD COLUMN IF NOT EXISTS category TEXT,
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN IF NOT EXISTS priority TEXT CHECK (priority IN ('high', 'medium', 'low')),
ADD COLUMN IF NOT EXISTS due_date TIMESTAMPTZ;

-- ============================================
-- PASO 2: Crear índices para performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_todos_category ON todos(category);
CREATE INDEX IF NOT EXISTS idx_todos_priority ON todos(priority);
CREATE INDEX IF NOT EXISTS idx_todos_due_date ON todos(due_date);
CREATE INDEX IF NOT EXISTS idx_todos_tags ON todos USING GIN(tags);

-- ============================================
-- PASO 3: Actualizar tareas existentes con valores por defecto
-- ============================================

UPDATE todos 
SET 
  category = 'general',
  priority = 'medium',
  tags = ARRAY[]::TEXT[]
WHERE category IS NULL;

-- ============================================
-- PASO 4: Crear tabla de categorías (opcional pero recomendado)
-- ============================================

CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, name)
);

-- Índice para búsquedas por usuario
CREATE INDEX IF NOT EXISTS idx_categories_user_id ON categories(user_id);

-- ============================================
-- PASO 5: Insertar categorías por defecto
-- ============================================

-- Estas son categorías de ejemplo que todos los usuarios pueden usar
-- El user_id 'default' indica que son categorías predefinidas

INSERT INTO categories (user_id, name, color, icon) VALUES
('default', 'Trabajo', '#3B82F6', '💼'),
('default', 'Personal', '#10B981', '🏠'),
('default', 'Urgente', '#EF4444', '🔥'),
('default', 'Compras', '#F59E0B', '🛒'),
('default', 'Salud', '#8B5CF6', '💪'),
('default', 'Estudio', '#06B6D4', '📚'),
('default', 'Familia', '#EC4899', '👨‍👩‍👧‍👦'),
('default', 'Hobbies', '#14B8A6', '🎨')
ON CONFLICT (user_id, name) DO NOTHING;

-- ============================================
-- PASO 6: Verificar que todo se creó correctamente
-- ============================================

-- Ver estructura de la tabla todos
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'todos'
ORDER BY ordinal_position;

-- Ver índices creados
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'todos';

-- Ver categorías por defecto
SELECT * FROM categories WHERE user_id = 'default';

-- Contar tareas actualizadas
SELECT 
  COUNT(*) as total_tasks,
  COUNT(category) as tasks_with_category,
  COUNT(priority) as tasks_with_priority
FROM todos;
```

---

## ✅ Verificación

Después de ejecutar el SQL, deberías ver:

1. **Columnas agregadas:**
   - `category` (TEXT)
   - `tags` (TEXT[])
   - `priority` (TEXT)
   - `due_date` (TIMESTAMPTZ)

2. **Índices creados:**
   - `idx_todos_category`
   - `idx_todos_priority`
   - `idx_todos_due_date`
   - `idx_todos_tags`

3. **Tabla categories creada** con 8 categorías por defecto

4. **Tareas existentes actualizadas** con:
   - category = 'general'
   - priority = 'medium'
   - tags = []

---

## 🔍 Queries de Verificación

### Ver todas las columnas de la tabla todos
```sql
SELECT * FROM todos LIMIT 1;
```

### Ver categorías disponibles
```sql
SELECT * FROM categories;
```

### Ver tareas con sus nuevos campos
```sql
SELECT 
  id,
  text,
  category,
  priority,
  tags,
  due_date,
  completed
FROM todos
LIMIT 5;
```

---

## 🚨 Troubleshooting

### Error: "column already exists"
**Solución:** Ignora el error, significa que ya ejecutaste el SQL antes. Las columnas ya existen.

### Error: "relation categories already exists"
**Solución:** La tabla ya existe, puedes continuar.

### Error: "duplicate key value violates unique constraint"
**Solución:** Las categorías por defecto ya existen, puedes continuar.

### Quiero empezar de cero
```sql
-- ⚠️ CUIDADO: Esto eliminará TODAS las categorías personalizadas
DELETE FROM categories WHERE user_id != 'default';

-- Para eliminar TODO (incluyendo tareas)
-- DROP TABLE IF EXISTS categories CASCADE;
-- Luego vuelve a ejecutar el SQL completo
```

---

## 📝 Notas Importantes

1. **Compatibilidad:** Las tareas existentes seguirán funcionando normalmente
2. **Valores por defecto:** Todas las tareas existentes recibirán category='general' y priority='medium'
3. **Opcional:** Los nuevos campos son opcionales, las tareas sin ellos funcionarán bien
4. **Performance:** Los índices aseguran que las búsquedas sean rápidas incluso con miles de tareas
5. **Categorías:** Los usuarios pueden crear sus propias categorías además de las predefinidas

---

## ✅ Siguiente Paso

Una vez ejecutado el SQL exitosamente:
1. Verifica que las columnas se crearon
2. Verifica que las categorías por defecto existen
3. Continúa con la Fase 1.2: Actualizar TypeScript Types

Ver: `TODO_FEATURES.md` para el progreso completo.
