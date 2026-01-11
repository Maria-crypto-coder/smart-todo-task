'use client';

import { useTodos } from '@/hooks/useTodos';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import TodoFilters from './TodoFilters';
import { ClipboardList, AlertCircle, RefreshCw } from 'lucide-react';

export default function TodoList() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    stats,
    isLoaded,
    isLoading,
    error,
    refetch,
  } = useTodos();

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-zinc-200 dark:border-zinc-800 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 animate-pulse">Cargando tus tareas...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-2xl">
          <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
        </div>
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
          Error al cargar las tareas
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400 text-center max-w-md">
          {error}
        </p>
        <button
          onClick={refetch}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
        >
          <RefreshCw className="w-4 h-4" />
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <TodoForm onAdd={addTodo} />

      {todos.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl mb-6">
            <ClipboardList className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
            {filter === 'all' && 'No hay tareas'}
            {filter === 'active' && 'No hay tareas activas'}
            {filter === 'completed' && 'No hay tareas completadas'}
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400">
            {filter === 'all' && '¡Agrega una tarea para comenzar!'}
            {filter === 'active' && 'Todas tus tareas están completadas 🎉'}
            {filter === 'completed' && 'Completa algunas tareas para verlas aquí'}
          </p>
        </div>
      ) : (
        <div className="space-y-3 mb-6">
          {todos.map((todo, index) => (
            <div
              key={todo.id}
              style={{
                animation: `slideIn 0.3s ease-out ${index * 0.05}s both`
              }}
            >
              <TodoItem
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            </div>
          ))}
        </div>
      )}

      {stats.total > 0 && (
        <TodoFilters
          currentFilter={filter}
          onFilterChange={setFilter}
          stats={stats}
          onClearCompleted={clearCompleted}
        />
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
