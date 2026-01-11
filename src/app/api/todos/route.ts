import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';
import { Todo, TodoDB } from '@/types/todo';

// Helper para convertir de DB format a App format
function dbToTodo(dbTodo: TodoDB): Todo {
  return {
    id: dbTodo.id,
    text: dbTodo.text,
    completed: dbTodo.completed,
    createdAt: new Date(dbTodo.created_at).getTime(),
    updatedAt: new Date(dbTodo.updated_at).getTime(),
    userId: dbTodo.user_id,
  };
}

// GET /api/todos - Obtener todas las tareas del usuario
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

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

    const body = await request.json();
    const { text } = body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'El texto de la tarea es requerido' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('todos')
      .insert([
        {
          user_id: userId,
          text: text.trim(),
          completed: false,
        },
      ])
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
