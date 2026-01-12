# 🎯 Plan de Implementación: Categorías, Fechas y Prioridades

## 📋 Resumen de Mejoras

Vamos a agregar 3 features principales:
1. **Categorías y Etiquetas** - Organizar tareas por tipo
2. **Fechas de Vencimiento** - Gestión temporal de tareas
3. **Sistema de Prioridades** - Clasificación por importancia

---

## 🗄️ Cambios en Base de Datos

### SQL para Actualizar Tabla `todos`

```sql
-- Agregar nuevas columnas a la tabla todos
ALTER TABLE todos
ADD COLUMN category TEXT,
ADD COLUMN tags TEXT[], -- Array de strings para múltiples etiquetas
ADD COLUMN priority TEXT CHECK (priority IN ('high', 'medium', 'low')),
ADD COLUMN due_date TIMESTAMPTZ;

-- Crear índices para búsquedas rápidas
CREATE INDEX idx_todos_category ON todos(category);
CREATE INDEX idx_todos_priority ON todos(priority);
CREATE INDEX idx_todos_due_date ON todos(due_date);

-- Valores por defecto para tareas existentes
UPDATE todos 
SET 
  category = 'general',
  priority = 'medium',
  tags = ARRAY[]::TEXT[]
WHERE category IS NULL;
```

### Tabla de Categorías (Opcional - para categorías predefinidas)

```sql
-- Tabla para categorías personalizadas por usuario
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  color TEXT NOT NULL, -- Hex color code
  icon TEXT, -- Emoji o nombre de icono
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, name)
);

-- Índice para búsquedas por usuario
CREATE INDEX idx_categories_user_id ON categories(user_id);

-- Categorías por defecto (opcional)
INSERT INTO categories (user_id, name, color, icon) VALUES
('default', 'Trabajo', '#3B82F6', '💼'),
('default', 'Personal', '#10B981', '🏠'),
('default', 'Urgente', '#EF4444', '🔥'),
('default', 'Compras', '#F59E0B', '🛒'),
('default', 'Salud', '#8B5CF6', '💪'),
('default', 'Estudio', '#06B6D4', '📚');
```

---

## 📝 Cambios en TypeScript

### 1. Actualizar `src/types/todo.ts`

```typescript
export type Priority = 'high' | 'medium' | 'low';

export interface Category {
  id: string;
  user_id: string;
  name: string;
  color: string;
  icon?: string;
  created_at: number;
}

export interface Todo {
  id: string;
  user_id?: string;
  text: string;
  completed: boolean;
  category?: string;
  tags?: string[];
  priority?: Priority;
  due_date?: number; // timestamp
  createdAt: number;
  updatedAt: number;
}

export type FilterType = 'all' | 'active' | 'completed';

export interface TodoFilters {
  status: FilterType;
  category?: string;
  priority?: Priority;
  tags?: string[];
  dueDateRange?: {
    start?: number;
    end?: number;
  };
}

export interface TodosResponse {
  data?: Todo[];
  error?: string;
}

export interface TodoResponse {
  data?: Todo;
  error?: string;
}

export interface CategoriesResponse {
  data?: Category[];
  error?: string;
}

export interface CategoryResponse {
  data?: Category;
  error?: string;
}
```

---

## 🔧 Cambios en Backend

### 2. Actualizar API Routes

#### `src/app/api/todos/route.ts` (GET y POST)

**Cambios en GET:**
- Agregar filtros por categoría, prioridad, tags
- Ordenar por fecha de vencimiento

**Cambios en POST:**
- Aceptar category, tags, priority, due_date
- Validar valores

#### `src/app/api/todos/[id]/route.ts` (PATCH y DELETE)

**Cambios en PATCH:**
- Permitir actualizar category, tags, priority, due_date

### 3. Crear API para Categorías

#### `src/app/api/categories/route.ts`
- GET: Listar categorías del usuario
- POST: Crear nueva categoría

#### `src/app/api/categories/[id]/route.ts`
- PATCH: Actualizar categoría
- DELETE: Eliminar categoría

---

## 🎨 Cambios en Frontend

### 4. Componentes Nuevos

#### `src/components/CategorySelector.tsx`
- Dropdown para seleccionar categoría
- Mostrar color e icono
- Opción para crear nueva categoría

#### `src/components/PrioritySelector.tsx`
- Selector de prioridad (Alta, Media, Baja)
- Indicadores visuales con colores

#### `src/components/DatePicker.tsx`
- Selector de fecha de vencimiento
- Mostrar fecha en formato amigable
- Opción para limpiar fecha

#### `src/components/TagInput.tsx`
- Input para agregar etiquetas
- Mostrar etiquetas como chips
- Eliminar etiquetas

#### `src/components/TodoFiltersAdvanced.tsx`
- Filtros avanzados (categoría, prioridad, tags, fecha)
- Reemplaza o extiende TodoFilters actual

#### `src/components/CategoryBadge.tsx`
- Badge visual para mostrar categoría
- Con color e icono

#### `src/components/PriorityBadge.tsx`
- Badge visual para prioridad
- Colores: Rojo (alta), Amarillo (media), Verde (baja)

#### `src/components/DueDateIndicator.tsx`
- Mostrar fecha de vencimiento
- Indicador visual si está próxima o vencida
- Colores: Rojo (vencida), Amarillo (próxima), Verde (lejana)

### 5. Componentes a Actualizar

#### `src/components/TodoForm.tsx`
- Agregar CategorySelector
- Agregar PrioritySelector
- Agregar DatePicker
- Agregar TagInput

#### `src/components/TodoItem.tsx`
- Mostrar CategoryBadge
- Mostrar PriorityBadge
- Mostrar DueDateIndicator
- Mostrar tags
- Permitir editar todos los campos

#### `src/components/TodoList.tsx`
- Integrar filtros avanzados
- Ordenar por prioridad/fecha

### 6. Hooks a Actualizar

#### `src/hooks/useTodos.ts`
- Actualizar addTodo para incluir nuevos campos
- Actualizar editTodo para todos los campos
- Agregar filtros avanzados
- Agregar ordenamiento

#### `src/hooks/useCategories.ts` (Nuevo)
- Gestionar categorías del usuario
- CRUD de categorías

---

## 🎨 Diseño Visual

### Colores de Prioridad
- **Alta:** `bg-red-100 text-red-800 border-red-300`
- **Media:** `bg-yellow-100 text-yellow-800 border-yellow-300`
- **Baja:** `bg-green-100 text-green-800 border-green-300`

### Indicadores de Fecha
- **Vencida:** Rojo - `text-red-600`
- **Hoy:** Naranja - `text-orange-600`
- **Esta semana:** Amarillo - `text-yellow-600`
- **Próxima:** Verde - `text-green-600`

### Categorías
- Cada categoría tiene su color personalizado
- Icono emoji opcional
- Badge redondeado con color de fondo

---

## 📦 Orden de Implementación

### Fase 1: Base de Datos y Backend (30-40 min)
1. ✅ Ejecutar SQL en Supabase
2. ✅ Actualizar tipos TypeScript
3. ✅ Actualizar API Routes existentes
4. ✅ Crear API de categorías
5. ✅ Testing de APIs

### Fase 2: Componentes Base (40-50 min)
6. ✅ Crear CategorySelector
7. ✅ Crear PrioritySelector
8. ✅ Crear DatePicker
9. ✅ Crear TagInput
10. ✅ Crear Badges (Category, Priority, DueDate)

### Fase 3: Integración (30-40 min)
11. ✅ Actualizar TodoForm
12. ✅ Actualizar TodoItem
13. ✅ Actualizar useTodos hook
14. ✅ Crear useCategories hook

### Fase 4: Filtros Avanzados (20-30 min)
15. ✅ Crear TodoFiltersAdvanced
16. ✅ Integrar en TodoList
17. ✅ Implementar lógica de filtrado

### Fase 5: Testing y Refinamiento (20-30 min)
18. ✅ Testing completo
19. ✅ Ajustes de UI/UX
20. ✅ Documentación
21. ✅ Deploy

**Tiempo Total Estimado:** 2-3 horas

---

## 🎯 Resultado Final

Al completar estas mejoras, tu app tendrá:

✅ **Categorías Personalizables**
- Crear, editar, eliminar categorías
- Asignar colores e iconos
- Filtrar tareas por categoría

✅ **Fechas de Vencimiento**
- Asignar fecha límite a tareas
- Indicadores visuales de urgencia
- Ordenar por fecha
- Filtrar por rango de fechas

✅ **Sistema de Prioridades**
- 3 niveles: Alta, Media, Baja
- Indicadores visuales con colores
- Filtrar por prioridad
- Ordenar por prioridad

✅ **Etiquetas (Tags)**
- Múltiples etiquetas por tarea
- Filtrar por etiquetas
- Búsqueda por tags

✅ **Filtros Avanzados**
- Combinar múltiples filtros
- Búsqueda más precisa
- Mejor organización

---

## 📝 Notas Importantes

1. **Migración de Datos:** Las tareas existentes recibirán valores por defecto
2. **Compatibilidad:** Todo es opcional, las tareas sin estos campos seguirán funcionando
3. **Performance:** Los índices en la DB aseguran búsquedas rápidas
4. **UX:** Optimistic updates se mantienen para todos los campos
5. **Responsive:** Todos los componentes funcionarán en móvil

---

## 🚀 ¿Listo para Empezar?

Confirma si quieres proceder con este plan y comenzaré con la Fase 1: Base de Datos y Backend.
