'use client';

import { useState, useEffect } from 'react';
import { Todo, FilterType, TodosResponse, TodoResponse, Priority } from '@/types/todo';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load todos from API on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/todos');
      const result: TodosResponse = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error || 'Error al cargar las tareas');
      }

      setTodos(result.data || []);
      setIsLoaded(true);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setIsLoaded(true);
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async (
    text: string,
    options?: {
      category?: string;
      tags?: string[];
      priority?: Priority;
      due_date?: number;
    }
  ) => {
    try {
      setError(null);

      console.log('useTodos - addTodo called with:', { text, options });

      // Optimistic update
      const tempTodo: Todo = {
        id: crypto.randomUUID(),
        text: text.trim(),
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        category: options?.category,
        tags: options?.tags || [],
        priority: options?.priority,
        due_date: options?.due_date,
      };
      setTodos((prev) => [tempTodo, ...prev]);

      const payload = {
        text,
        category: options?.category,
        tags: options?.tags,
        priority: options?.priority,
        due_date: options?.due_date,
      };

      console.log('useTodos - Sending payload to API:', payload);

      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result: TodoResponse = await response.json();
      console.log('useTodos - API response:', result);

      if (!response.ok || result.error) {
        // Revert optimistic update
        setTodos((prev) => prev.filter((t) => t.id !== tempTodo.id));
        throw new Error(result.error || 'Error al crear la tarea');
      }

      // Replace temp todo with real one from server
      setTodos((prev) =>
        prev.map((t) => (t.id === tempTodo.id ? result.data! : t))
      );
    } catch (err) {
      console.error('Error adding todo:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      throw err;
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      setError(null);

      // Optimistic update
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      setTodos((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, completed: !t.completed, updatedAt: Date.now() } : t
        )
      );

      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      const result: TodoResponse = await response.json();

      if (!response.ok || result.error) {
        // Revert optimistic update
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? todo : t))
        );
        throw new Error(result.error || 'Error al actualizar la tarea');
      }

      // Update with server response
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? result.data! : t))
      );
    } catch (err) {
      console.error('Error toggling todo:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      setError(null);

      // Optimistic update
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      setTodos((prev) => prev.filter((t) => t.id !== id));

      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        // Revert optimistic update
        setTodos((prev) => [...prev, todo].sort((a, b) => b.createdAt - a.createdAt));
        throw new Error(result.error || 'Error al eliminar la tarea');
      }
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  const editTodo = async (
    id: string,
    updates: {
      text?: string;
      category?: string;
      tags?: string[];
      priority?: Priority;
      due_date?: number;
    }
  ) => {
    try {
      setError(null);

      // Optimistic update
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      const updatedTodo = {
        ...todo,
        ...updates,
        text: updates.text !== undefined ? updates.text.trim() : todo.text,
        updatedAt: Date.now(),
      };

      setTodos((prev) =>
        prev.map((t) => (t.id === id ? updatedTodo : t))
      );

      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      const result: TodoResponse = await response.json();

      if (!response.ok || result.error) {
        // Revert optimistic update
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? todo : t))
        );
        throw new Error(result.error || 'Error al editar la tarea');
      }

      // Update with server response
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? result.data! : t))
      );
    } catch (err) {
      console.error('Error editing todo:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      throw err;
    }
  };

  const clearCompleted = async () => {
    try {
      setError(null);

      const completedTodos = todos.filter((t) => t.completed);
      
      // Optimistic update
      setTodos((prev) => prev.filter((t) => !t.completed));

      // Delete all completed todos
      const deletePromises = completedTodos.map((todo) =>
        fetch(`/api/todos/${todo.id}`, { method: 'DELETE' })
      );

      const responses = await Promise.all(deletePromises);
      const hasError = responses.some((r) => !r.ok);

      if (hasError) {
        // Revert optimistic update
        setTodos((prev) => [...prev, ...completedTodos].sort((a, b) => b.createdAt - a.createdAt));
        throw new Error('Error al eliminar algunas tareas');
      }
    } catch (err) {
      console.error('Error clearing completed todos:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  return {
    todos: filteredTodos,
    allTodos: todos,
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
    refetch: fetchTodos,
  };
}
