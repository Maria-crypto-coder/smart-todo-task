'use client';

import { useState, useEffect } from 'react';
import { Category } from '@/types/todo';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/categories');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al cargar categorías');
      }

      setCategories(result.data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  // Load categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Add category
  const addCategory = async (name: string, color: string, icon?: string) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, color, icon }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al crear categoría');
      }

      // Add to local state
      setCategories((prev) => [...prev, result.data]);
      return result.data;
    } catch (err) {
      console.error('Error adding category:', err);
      throw err;
    }
  };

  // Edit category
  const editCategory = async (
    id: string,
    updates: { name?: string; color?: string; icon?: string }
  ) => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al actualizar categoría');
      }

      // Update local state
      setCategories((prev) =>
        prev.map((cat) => (cat.id === id ? result.data : cat))
      );
      return result.data;
    } catch (err) {
      console.error('Error editing category:', err);
      throw err;
    }
  };

  // Delete category
  const deleteCategory = async (id: string) => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al eliminar categoría');
      }

      // Remove from local state
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err) {
      console.error('Error deleting category:', err);
      throw err;
    }
  };

  // Get category by name
  const getCategoryByName = (name: string) => {
    return categories.find((cat) => cat.name === name);
  };

  return {
    categories,
    isLoading,
    error,
    fetchCategories,
    addCategory,
    editCategory,
    deleteCategory,
    getCategoryByName,
  };
}
