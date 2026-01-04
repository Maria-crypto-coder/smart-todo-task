# Documentación Técnica - Smart TODO App

## Índice
1. [Arquitectura General](#arquitectura-general)
2. [Flujo de Datos](#flujo-de-datos)
3. [Algoritmos y Lógica](#algoritmos-y-lógica)
4. [Integración de Tecnologías](#integración-de-tecnologías)
5. [Componentes Detallados](#componentes-detallados)

---

## 1. Arquitectura General

### Stack Tecnológico

```
┌─────────────────────────────────────────┐
│           FRONTEND (React 19)           │
├─────────────────────────────────────────┤
│  Next.js 16 (App Router + Server Side) │
├─────────────────────────────────────────┤
│     TypeScript (Type Safety)            │
├─────────────────────────────────────────┤
│   Tailwind CSS (Styling)                │
├─────────────────────────────────────────┤
│   Clerk (Authentication)                │
├─────────────────────────────────────────┤
│   localStorage (Data Persistence)       │
└─────────────────────────────────────────┘
```

### Estructura de Carpetas

```
smart-todo-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Layout raíz con Clerk
│   │   ├── page.tsx           # Página principal
│   │   └── globals.css        # Estilos globales
│   ├── components/            # Componentes React
│   │   ├── TodoList.tsx       # Contenedor principal
│   │   ├── TodoItem.tsx       # Item individual
│   │   ├── TodoForm.tsx       # Formulario
│   │   └── TodoFilters.tsx    # Filtros
│   ├── hooks/                 # Custom Hooks
│   │   └── useTodos.ts        # Lógica de estado
│   ├── types/                 # TypeScript Types
│   │   └── todo.ts            # Interfaces
│   └── middleware.ts          # Clerk Middleware
├── public/                    # Assets estáticos
└── package.json              # Dependencias
```

---

## 2. Flujo de Datos

### Diagrama de Flujo Completo

```
┌──────────────┐
│   Usuario    │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────┐
│  1. Accede a la app                  │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│  2. Middleware (src/middleware.ts)   │
│     - Verifica autenticación         │
│     - Clerk intercepta la request    │
└──────┬───────────────────────────────┘
       │
       ├─── NO AUTENTICADO ───┐
       │                      │
       │                      ▼
       │              ┌───────────────┐
       │              │ SignedOut     │
       │              │ (Pantalla de  │
       │              │  bienvenida)  │
       │              └───────────────┘
       │
       └─── AUTENTICADO ───┐
                           │
                           ▼
                   ┌───────────────────┐
                   │  3. Layout        │
                   │  - ClerkProvider  │
                   │  - Header         │
                   └────────┬──────────┘
                            │
                            ▼
                   ┌───────────────────┐
                   │  4. Page (SignedIn)│
                   │  - TodoList       │
                   └────────┬──────────┘
                            │
                            ▼
                   ┌───────────────────┐
                   │  5. useTodos Hook │
                   │  - Estado         │
                   │  - localStorage   │
                   └────────┬──────────┘
                            │
                            ▼
                   ┌───────────────────┐
                   │  6. Componentes   │
                   │  - TodoForm       │
                   │  - TodoItem       │
                   │  - TodoFilters    │
                   └───────────────────┘
```

---

## 3. Algoritmos y Lógica

### 3.1 Hook useTodos (src/hooks/useTodos.ts)

Este es el cerebro de la aplicación. Maneja todo el estado y la lógica.

#### Algoritmo de Inicialización

```typescript
// PASO 1: Cargar datos desde localStorage
useEffect(() => {
  // 1.1 Obtener datos guardados
  const stored = localStorage.getItem('smart-todo-app-tasks');
  
  // 1.2 Si existen, parsear JSON
  if (stored) {
    try {
      setTodos(JSON.parse(stored));
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  }
  
  // 1.3 Marcar como cargado
  setIsLoaded(true);
}, []);
```

**¿Cómo funciona?**
1. Al montar el componente, busca en localStorage
2. Si encuentra datos, los convierte de JSON a objetos JavaScript
3. Actualiza el estado con esos datos
4. Marca que ya terminó de cargar

#### Algoritmo de Persistencia

```typescript
// PASO 2: Guardar datos en localStorage
useEffect(() => {
  if (isLoaded) {
    // Solo guardar si ya cargó inicialmente
    localStorage.setItem('smart-todo-app-tasks', JSON.stringify(todos));
  }
}, [todos, isLoaded]);
```

**¿Cómo funciona?**
1. Cada vez que cambia el array `todos`, se ejecuta
2. Verifica que ya haya cargado (evita sobrescribir en la primera carga)
3. Convierte el array a JSON y lo guarda en localStorage

#### Algoritmo de Agregar Tarea

```typescript
const addTodo = (text: string) => {
  // 1. Crear objeto de tarea
  const newTodo: Todo = {
    id: crypto.randomUUID(),           // ID único
    text: text.trim(),                 // Texto sin espacios
    completed: false,                  // Inicia como pendiente
    createdAt: Date.now(),            // Timestamp de creación
    updatedAt: Date.now(),            // Timestamp de actualización
  };
  
  // 2. Agregar al inicio del array (más reciente primero)
  setTodos((prev) => [newTodo, ...prev]);
};
```

**¿Cómo funciona?**
1. Genera un ID único usando `crypto.randomUUID()`
2. Limpia el texto con `.trim()`
3. Crea el objeto con todos los campos
4. Lo agrega al inicio del array (spread operator)
5. React detecta el cambio y re-renderiza
6. El useEffect de persistencia lo guarda automáticamente

#### Algoritmo de Toggle (Completar/Descompletar)

```typescript
const toggleTodo = (id: string) => {
  setTodos((prev) =>
    prev.map((todo) =>
      todo.id === id
        ? { ...todo, completed: !todo.completed, updatedAt: Date.now() }
        : todo
    )
  );
};
```

**¿Cómo funciona?**
1. Recorre todo el array con `.map()`
2. Para cada tarea, verifica si el ID coincide
3. Si coincide:
   - Crea una copia del objeto (`...todo`)
   - Invierte el estado de `completed` (`!todo.completed`)
   - Actualiza el timestamp
4. Si no coincide, devuelve la tarea sin cambios
5. React detecta el nuevo array y re-renderiza

#### Algoritmo de Filtrado

```typescript
const filteredTodos = todos.filter((todo) => {
  if (filter === 'active') return !todo.completed;
  if (filter === 'completed') return todo.completed;
  return true; // 'all'
});
```

**¿Cómo funciona?**
1. Usa `.filter()` para crear un nuevo array
2. Según el filtro activo:
   - `active`: solo tareas NO completadas
   - `completed`: solo tareas completadas
   - `all`: todas las tareas
3. Devuelve el array filtrado
4. Este array es el que se renderiza en la UI

#### Algoritmo de Estadísticas

```typescript
const stats = {
  total: todos.length,
  active: todos.filter((t) => !t.completed).length,
  completed: todos.filter((t) => t.completed).length,
};
```

**¿Cómo funciona?**
1. Cuenta el total de tareas
2. Filtra y cuenta las activas (no completadas)
3. Filtra y cuenta las completadas
4. Devuelve un objeto con los tres valores
5. Se usa en TodoFilters para mostrar los contadores

---

## 4. Integración de Tecnologías

### 4.1 Next.js + React

**¿Cómo se complementan?**

```typescript
// Next.js proporciona:
// - Routing automático (app/page.tsx → /)
// - Server Components por defecto
// - Optimización de imágenes
// - API Routes

// React proporciona:
// - Componentes reutilizables
// - Estado con useState
// - Efectos con useEffect
// - Hooks personalizados
```

**Ejemplo de integración:**

```typescript
// page.tsx (Next.js)
export default function Home() {
  // Este es un Server Component por defecto
  return <TodoList />; // Renderiza un Client Component
}

// TodoList.tsx (React)
'use client'; // Marca como Client Component

export default function TodoList() {
  const { todos } = useTodos(); // Usa hooks de React
  return <div>{/* ... */}</div>;
}
```

### 4.2 TypeScript + JavaScript

**¿Cómo se complementan?**

```typescript
// TypeScript añade tipos a JavaScript

// JavaScript puro:
const addTodo = (text) => {
  // ¿text es string? ¿number? ¿undefined?
  // No hay forma de saberlo sin ejecutar
};

// Con TypeScript:
const addTodo = (text: string) => {
  // Garantizado que text es string
  // El editor te avisa si pasas otro tipo
};
```

**Ejemplo de tipos:**

```typescript
// types/todo.ts
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
}

// Ahora TypeScript sabe exactamente qué es un Todo
// Y te avisa si falta algún campo o usas el tipo incorrecto
```

### 4.3 Clerk + Next.js

**¿Cómo se integran?**

```typescript
// 1. Middleware intercepta todas las requests
// src/middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';
export default clerkMiddleware();

// 2. Layout envuelve la app con ClerkProvider
// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  );
}

// 3. Componentes usan hooks de Clerk
// page.tsx
import { SignedIn, SignedOut } from '@clerk/nextjs';

export default function Home() {
  return (
    <>
      <SignedIn>{/* Contenido para autenticados */}</SignedIn>
      <SignedOut>{/* Contenido para no autenticados */}</SignedOut>
    </>
  );
}
```

**Flujo de autenticación:**

```
1. Usuario accede → Middleware verifica token
2. No hay token → Muestra SignedOut
3. Usuario hace login → Clerk genera token
4. Token guardado en cookies
5. Middleware detecta token → Permite acceso
6. Muestra SignedIn
```

### 4.4 Tailwind CSS + React

**¿Cómo se complementan?**

```typescript
// Tailwind proporciona clases utility
// React las aplica dinámicamente

export default function TodoItem({ todo }) {
  return (
    <div
      className={`
        p-4 rounded-lg
        ${todo.completed 
          ? 'bg-green-50 border-green-200' 
          : 'bg-white border-zinc-200'
        }
      `}
    >
      {todo.text}
    </div>
  );
}
```

**Ventajas:**
- No necesitas archivos CSS separados
- Clases reutilizables
- Purge automático (solo incluye clases usadas)
- Responsive fácil: `sm:text-lg md:text-xl`

---

## 5. Componentes Detallados

### 5.1 TodoForm

**Propósito:** Capturar input del usuario y agregar tareas

**Algoritmo:**

```typescript
const [input, setInput] = useState('');

const handleSubmit = (e: FormEvent) => {
  e.preventDefault();           // 1. Prevenir reload
  if (input.trim()) {          // 2. Validar no vacío
    onAdd(input);              // 3. Llamar función padre
    setInput('');              // 4. Limpiar input
  }
};
```

**Flujo:**
```
Usuario escribe → onChange actualiza estado
Usuario presiona Enter → handleSubmit
  → Valida input
  → Llama onAdd (del padre)
  → Limpia input
  → useTodos agrega la tarea
  → Re-render automático
```

### 5.2 TodoItem

**Propósito:** Mostrar y editar una tarea individual

**Estados:**
- `isEditing`: boolean - ¿Está en modo edición?
- `editText`: string - Texto temporal mientras edita

**Algoritmo de edición:**

```typescript
const [isEditing, setIsEditing] = useState(false);
const [editText, setEditText] = useState(todo.text);

const handleEdit = () => {
  if (editText.trim() && editText !== todo.text) {
    onEdit(todo.id, editText);  // Guardar cambios
  } else {
    setEditText(todo.text);     // Revertir cambios
  }
  setIsEditing(false);          // Salir de modo edición
};
```

**Flujo de edición:**
```
Usuario hace click en texto → setIsEditing(true)
  → Muestra input con editText
Usuario escribe → onChange actualiza editText
Usuario presiona Enter o hace blur → handleEdit
  → Valida cambios
  → Llama onEdit (del padre)
  → useTodos actualiza la tarea
  → Re-render con nuevo texto
```

### 5.3 TodoFilters

**Propósito:** Filtrar tareas y mostrar estadísticas

**Algoritmo de filtrado:**

```typescript
const filters = [
  { value: 'all', label: 'Todas' },
  { value: 'active', label: 'Activas' },
  { value: 'completed', label: 'Completadas' },
];

// Cuando usuario hace click:
onClick={() => onFilterChange(filter.value)}
  → useTodos actualiza filter
  → filteredTodos se recalcula
  → TodoList re-renderiza con nuevo array
```

### 5.4 TodoList

**Propósito:** Orquestar todos los componentes

**Algoritmo de renderizado:**

```typescript
if (!isLoaded) {
  return <LoadingSpinner />;  // Mientras carga
}

if (todos.length === 0) {
  return <EmptyState />;      // Si no hay tareas
}

return (
  <>
    <TodoForm onAdd={addTodo} />
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    ))}
    <TodoFilters {...props} />
  </>
);
```

---

## 6. Ciclo de Vida Completo

### Ejemplo: Agregar una tarea

```
1. Usuario escribe "Comprar leche" en TodoForm
   └─> onChange actualiza estado local

2. Usuario presiona Enter
   └─> handleSubmit se ejecuta
       └─> onAdd("Comprar leche") se llama

3. useTodos.addTodo recibe el texto
   └─> Crea objeto Todo con ID único
   └─> Agrega al array con setTodos
       └─> React detecta cambio de estado

4. useEffect de persistencia se ejecuta
   └─> Guarda en localStorage

5. React re-renderiza TodoList
   └─> Nuevo TodoItem aparece en la UI

6. Animación CSS se ejecuta
   └─> Tarea aparece con efecto slide-in
```

### Ejemplo: Completar una tarea

```
1. Usuario hace click en checkbox
   └─> onClick llama onToggle(todo.id)

2. useTodos.toggleTodo recibe el ID
   └─> map() recorre el array
   └─> Encuentra la tarea con ese ID
   └─> Invierte completed
   └─> Actualiza updatedAt

3. setTodos actualiza el estado
   └─> React detecta cambio

4. useEffect de persistencia guarda
   └─> localStorage actualizado

5. React re-renderiza TodoItem
   └─> Checkbox muestra checkmark
   └─> Texto tiene line-through
   └─> Fondo cambia a verde
```

---

## 7. Optimizaciones

### 7.1 React Optimizations

```typescript
// Usar key única para listas
{todos.map(todo => (
  <TodoItem key={todo.id} {...props} />
))}

// Evitar re-renders innecesarios
const filteredTodos = useMemo(() => {
  return todos.filter(/* ... */);
}, [todos, filter]);
```

### 7.2 localStorage Optimization

```typescript
// Guardar solo cuando cambia, no en cada render
useEffect(() => {
  if (isLoaded) {  // Evita guardar en carga inicial
    localStorage.setItem(KEY, JSON.stringify(todos));
  }
}, [todos, isLoaded]);
```

### 7.3 TypeScript Benefits

```typescript
// Catch errors en desarrollo, no en producción
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;  // Firma clara
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

// TypeScript verifica que pasas los props correctos
<TodoItem todo={todo} onToggle={toggleTodo} />
```

---

## 8. Seguridad

### 8.1 Clerk Authentication

```typescript
// Middleware protege todas las rutas
export default clerkMiddleware();

// Solo usuarios autenticados ven las tareas
<SignedIn>
  <TodoList />
</SignedIn>
```

### 8.2 Input Sanitization

```typescript
// Siempre limpiar input del usuario
const addTodo = (text: string) => {
  const newTodo = {
    text: text.trim(),  // Elimina espacios
    // ...
  };
};
```

### 8.3 localStorage Security

```typescript
// localStorage es por dominio
// Cada usuario ve solo sus tareas
// Clerk maneja la sesión
```

---

## Conclusión

Esta app combina:
- **Next.js**: Routing y optimización
- **React**: Componentes y estado
- **TypeScript**: Type safety
- **Tailwind**: Styling rápido
- **Clerk**: Autenticación segura
- **localStorage**: Persistencia local

Cada tecnología tiene un rol específico y se complementan para crear una app moderna, rápida y segura.
