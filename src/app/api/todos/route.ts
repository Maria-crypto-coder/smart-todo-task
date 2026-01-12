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

// GET /api/todos - Obtener todas las tareas del usuario con filtros opcionales
export async function GET(request: NextRequest) {
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

    // Obtener parámetros de filtro de la URL
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const priority = searchParams.get('priority');
    const tags = searchParams.get('tags')?.split(',').filter(Boolean);

    // Construir query
    let query = supabase
      .from('todos')
      .select('*')
      .eq('user_id', userId);

    // Aplicar filtros si existen
    if (category) {
      query = query.eq('category', category);
    }

    if (priority && isValidPriority(priority)) {
      query = query.eq('priority', priority);
    }

    if (tags && tags.length > 0) {
      query = query.contains('tags', tags);
    }

    // Ordenar por fecha de creación (más recientes primero)
    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching todos:', error);
      return NextResponse.json(
        { error: 'Error al obtener las tareas' },
        { status: 500 }
      );
    }

    const todos = data.map(dbToTodo);

    return NextResponse.json({ data: todos });
  } catch (error) {
    console.error('Error in GET /api/todos:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// POST /api/todos - Crear una nueva tarea
export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { text, category, tags, priority, due_date } = body;

    // Validar texto requerido
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'El texto de la tarea es requerido' },
        { status: 400 }
      );
    }

    // Validar prioridad si se proporciona
    if (priority && !isValidPriority(priority)) {
      return NextResponse.json(
        { error: 'Prioridad inválida. Debe ser: high, medium o low' },
        { status: 400 }
      );
    }

    // Validar tags si se proporcionan
    if (tags && !Array.isArray(tags)) {
      return NextResponse.json(
        { error: 'Tags debe ser un array' },
        { status: 400 }
      );
    }

    // Preparar datos para insertar
    const todoData: any = {
      user_id: userId,
      text: text.trim(),
      completed: false,
    };

    // Agregar campos opcionales si existen
    if (category) todoData.category = category;
    if (tags && tags.length > 0) todoData.tags = tags;
    if (priority) todoData.priority = priority;
    if (due_date) {
      // Convertir timestamp a ISO string para Supabase
      todoData.due_date = new Date(due_date).toISOString();
    }

    const { data, error } = await supabase
      .from('todos')
      .insert([todoData])
      .select()
      .single();

    if (error) {
      console.error('Error creating todo:', error);
      return NextResponse.json(
        { error: 'Error al crear la tarea' },
        { status: 500 }
      );
    }

    const todo = dbToTodo(data);

    return NextResponse.json({ data: todo }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/todos:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
