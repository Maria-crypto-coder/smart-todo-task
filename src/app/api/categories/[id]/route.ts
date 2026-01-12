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

// PATCH /api/categories/[id] - Actualizar una categoría
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
    const { name, color, icon } = body;

    // Validar que al menos un campo esté presente
    if (name === undefined && color === undefined && icon === undefined) {
      return NextResponse.json(
        { error: 'Se requiere al menos un campo para actualizar' },
        { status: 400 }
      );
    }

    // Verificar que la categoría pertenece al usuario (no se pueden editar las predefinidas)
    const { data: existing } = await supabase
      .from('categories')
      .select('user_id')
      .eq('id', id)
      .single();

    if (!existing) {
      return NextResponse.json(
        { error: 'Categoría no encontrada' },
        { status: 404 }
      );
    }

    if (existing.user_id === 'default') {
      return NextResponse.json(
        { error: 'No se pueden editar las categorías predefinidas' },
        { status: 403 }
      );
    }

    if (existing.user_id !== userId) {
      return NextResponse.json(
        { error: 'No tienes permiso para editar esta categoría' },
        { status: 403 }
      );
    }

    // Construir el objeto de actualización
    const updates: any = {
      updated_at: new Date().toISOString(),
    };

    // Validar y agregar nombre
    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length === 0) {
        return NextResponse.json(
          { error: 'El nombre de la categoría no puede estar vacío' },
          { status: 400 }
        );
      }

      // Verificar que no exista otra categoría con ese nombre
      const { data: duplicate } = await supabase
        .from('categories')
        .select('id')
        .eq('user_id', userId)
        .eq('name', name.trim())
        .neq('id', id)
        .single();

      if (duplicate) {
        return NextResponse.json(
          { error: 'Ya existe una categoría con ese nombre' },
          { status: 409 }
        );
      }

      updates.name = name.trim();
    }

    // Validar y agregar color
    if (color !== undefined) {
      if (typeof color !== 'string') {
        return NextResponse.json(
          { error: 'El color debe ser una cadena de texto' },
          { status: 400 }
        );
      }

      if (!/^#[0-9A-F]{6}$/i.test(color)) {
        return NextResponse.json(
          { error: 'El color debe estar en formato hexadecimal (#RRGGBB)' },
          { status: 400 }
        );
      }

      updates.color = color.toUpperCase();
    }

    // Agregar icono
    if (icon !== undefined) {
      updates.icon = icon || null;
    }

    // Actualizar la categoría
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating category:', error);
      return NextResponse.json(
        { error: 'Error al actualizar la categoría' },
        { status: 500 }
      );
    }

    const category = dbToCategory(data);

    return NextResponse.json({ data: category });
  } catch (error) {
    console.error('Error in PATCH /api/categories/[id]:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// DELETE /api/categories/[id] - Eliminar una categoría
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

    // Verificar que la categoría pertenece al usuario
    const { data: existing } = await supabase
      .from('categories')
      .select('user_id, name')
      .eq('id', id)
      .single();

    if (!existing) {
      return NextResponse.json(
        { error: 'Categoría no encontrada' },
        { status: 404 }
      );
    }

    if (existing.user_id === 'default') {
      return NextResponse.json(
        { error: 'No se pueden eliminar las categorías predefinidas' },
        { status: 403 }
      );
    }

    if (existing.user_id !== userId) {
      return NextResponse.json(
        { error: 'No tienes permiso para eliminar esta categoría' },
        { status: 403 }
      );
    }

    // Opcional: Actualizar tareas que usan esta categoría a 'general'
    await supabase
      .from('todos')
      .update({ category: 'general' })
      .eq('user_id', userId)
      .eq('category', existing.name);

    // Eliminar la categoría
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      console.error('Error deleting category:', error);
      return NextResponse.json(
        { error: 'Error al eliminar la categoría' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    console.error('Error in DELETE /api/categories/[id]:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
