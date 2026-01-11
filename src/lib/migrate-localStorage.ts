/**
 * Script de migración de localStorage a Supabase
 * 
 * Este script ayuda a migrar las tareas existentes en localStorage
 * a la nueva base de datos de Supabase.
 * 
 * Uso: Ejecutar una vez después de configurar Supabase
 */

import { Todo } from '@/types/todo';

const STORAGE_KEY = 'smart-todo-app-tasks';

export async function migrateLocalStorageToSupabase(): Promise<{
  success: boolean;
  migrated: number;
  errors: string[];
}> {
  const errors: string[] = [];
  let migrated = 0;

  try {
    // Obtener tareas de localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    
    if (!stored) {
      return {
        success: true,
        migrated: 0,
        errors: ['No hay tareas en localStorage para migrar'],
      };
    }

    const localTodos: Todo[] = JSON.parse(stored);

    if (localTodos.length === 0) {
      return {
        success: true,
        migrated: 0,
        errors: ['No hay tareas en localStorage para migrar'],
      };
    }

    console.log(`Migrando ${localTodos.length} tareas a Supabase...`);

    // Migrar cada tarea
    for (const todo of localTodos) {
      try {
        const response = await fetch('/api/todos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: todo.text }),
        });

        if (!response.ok) {
          const result = await response.json();
          errors.push(`Error al migrar "${todo.text}": ${result.error}`);
          continue;
        }

        const result = await response.json();
        
        // Si la tarea estaba completada, actualizarla
        if (todo.completed && result.data) {
          const updateResponse = await fetch(`/api/todos/${result.data.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: true }),
          });

          if (!updateResponse.ok) {
            errors.push(`Tarea "${todo.text}" migrada pero no se pudo marcar como completada`);
          }
        }

        migrated++;
      } catch (error) {
        errors.push(`Error al migrar "${todo.text}": ${error}`);
      }
    }

    // Si la migración fue exitosa, limpiar localStorage
    if (migrated > 0 && errors.length === 0) {
      localStorage.removeItem(STORAGE_KEY);
      console.log('✅ Migración completada. localStorage limpiado.');
    }

    return {
      success: errors.length === 0,
      migrated,
      errors,
    };
  } catch (error) {
    return {
      success: false,
      migrated,
      errors: [`Error general: ${error}`],
    };
  }
}

// Función helper para usar en la consola del navegador
if (typeof window !== 'undefined') {
  (window as any).migrateLocalStorage = migrateLocalStorageToSupabase;
}
