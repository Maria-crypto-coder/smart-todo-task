import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Todo, TodoDB, Priority } from '@/types/todo';

// Helper para convertir de DB format a App format
function dbToTodo(dbTodo: TodoDB): Todo {
  return {
    id: dbTodo.id,
    text: dbTodo.text,
    completed: dbTodo.completed,
    createdAt: new Date(dbTodo.created_at).getTime(),
    updatedAt: new Date(dbTodo.updated_at).getTime(),
    userId: dbTodo.user_id,
    category: dbTodo.category,
    tags: dbTodo.tags || [],
    priority: dbTodo.priority,
    due_date: dbTodo.due_date ? new Date(dbTodo.due_date).getTime() : undefined,
  };
}

// Validar prioridad
function isValidPriority(priority: any): priority is Priority {
  return ['high', 'medium', 'low'].includes(priority);
}

// PATCH /api/todos/[id] - Actualizar una tarea
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    if (!supabase || !isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Supabase no está configurado. Por favor configura las variables de entorno.' },
        { status: 500 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { text, completed, category, tags, priority, due_date } = body;

    // Validar que al menos un campo esté presente
    if (
      text === undefined &&
      completed === undefined &&
      category === undefined &&
      tags === undefined &&
      priority === undefined &&
      due_date === undefined
    ) {
      return NextResponse.json(
        { error: 'Se requiere al menos un campo para actualizar' },
        { status: 400 }
      );
    }

    // Construir el objeto de actualización
    const updates: any = {
      updated_at: new Date().toISOString(),
    };

    // Validar y agregar texto
    if (text !== undefined) {
      if (typeof text !== 'string' || text.trim().length === 0) {
        return NextResponse.json(
          { error: 'El texto de la tarea no puede estar vacío' },
          { status: 400 }
        );
      }
      updates.text = text.trim();
    }

    // Validar y agregar completed
    if (completed !== undefined) {
      if (typeof completed !== 'boolean') {
        return NextResponse.json(
          { error: 'El campo completed debe ser un booleano' },
          { status: 400 }
        );
      }
      updates.completed = completed;
    }

    // Agregar categoría
    if (category !== undefined) {
      updates.category = category || null;
    }

    // Validar y agregar tags
    if (tags !== undefined) {
      if (!Array.isArray(tags)) {
        return NextResponse.json(
          { error: 'Tags debe ser un array' },
          { status: 400 }
        );
      }
      updates.tags = tags;
    }

    // Validar y agregar prioridad
    if (priority !== undefined) {
      if (priority && !isValidPriority(priority)) {
        return NextResponse.json(
          { error: 'Prioridad inválida. Debe ser: high, medium o low' },
          { status: 400 }
        );
      }
      updates.priority = priority || null;
    }

    // Agregar fecha de vencimiento
    if (due_date !== undefined) {
      if (due_date === null) {
        updates.due_date = null;
      } else {
        // Convertir timestamp a ISO string
        updates.due_date = new Date(due_date).toISOString();
      }
    }

    // Actualizar solo si pertenece al usuario
    const { data, error } = await supabase
      .from('todos')
      .update(updates)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating todo:', error);
      return NextResponse.json(
        { error: 'Error al actualizar la tarea' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Tarea no encontrada' },
        { status: 404 }
      );
    }

    const todo = dbToTodo(data);

    return NextResponse.json({ data: todo });
  } catch (error) {
    console.error('Error in PATCH /api/todos/[id]:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// DELETE /api/todos/[id] - Eliminar una tarea
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    if (!supabase || !isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Supabase no está configurado. Por favor configura las variables de entorno.' },
        { status: 500 }
      );
    }

    const { id } = await params;

    // Eliminar solo si pertenece al usuario
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      console.error('Error deleting todo:', error);
      return NextResponse.json(
        { error: 'Error al eliminar la tarea' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    console.error('Error in DELETE /api/todos/[id]:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
