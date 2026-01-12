import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Category, CategoryDB } from '@/types/todo';

// Helper para convertir de DB format a App format
function dbToCategory(dbCategory: CategoryDB): Category {
  return {
    id: dbCategory.id,
    user_id: dbCategory.user_id,
    name: dbCategory.name,
    color: dbCategory.color,
    icon: dbCategory.icon,
    created_at: new Date(dbCategory.created_at).getTime(),
    updated_at: new Date(dbCategory.updated_at).getTime(),
  };
}

// GET /api/categories - Obtener todas las categorías (predefinidas + del usuario)
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

    // Obtener categorías predefinidas y del usuario
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .or(`user_id.eq.default,user_id.eq.${userId}`)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
      return NextResponse.json(
        { error: 'Error al obtener las categorías' },
        { status: 500 }
      );
    }

    const categories = data.map(dbToCategory);

    return NextResponse.json({ data: categories });
  } catch (error) {
    console.error('Error in GET /api/categories:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// POST /api/categories - Crear una nueva categoría personalizada
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
    const { name, color, icon } = body;

    // Validar nombre requerido
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'El nombre de la categoría es requerido' },
        { status: 400 }
      );
    }

    // Validar color requerido
    if (!color || typeof color !== 'string') {
      return NextResponse.json(
        { error: 'El color de la categoría es requerido' },
        { status: 400 }
      );
    }

    // Validar formato de color hex
    if (!/^#[0-9A-F]{6}$/i.test(color)) {
      return NextResponse.json(
        { error: 'El color debe estar en formato hexadecimal (#RRGGBB)' },
        { status: 400 }
      );
    }

    // Verificar si ya existe una categoría con ese nombre para el usuario
    const { data: existing } = await supabase
      .from('categories')
      .select('id')
      .eq('user_id', userId)
      .eq('name', name.trim())
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Ya existe una categoría con ese nombre' },
        { status: 409 }
      );
    }

    // Crear la categoría
    const { data, error } = await supabase
      .from('categories')
      .insert([
        {
          user_id: userId,
          name: name.trim(),
          color: color.toUpperCase(),
          icon: icon || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating category:', error);
      return NextResponse.json(
        { error: 'Error al crear la categoría' },
        { status: 500 }
      );
    }

    const category = dbToCategory(data);

    return NextResponse.json({ data: category }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/categories:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
