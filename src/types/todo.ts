// Priority levels
export type Priority = 'high' | 'medium' | 'low';

// Category interface
export interface Category {
  id: string;
  user_id: string;
  name: string;
  color: string;
  icon?: string;
  created_at: number;
  updated_at: number;
}

// Todo interface with new fields
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
  userId?: string; // Opcional para compatibilidad con datos existentes
  category?: string;
  tags?: string[];
  priority?: Priority;
  due_date?: number; // timestamp
}

// Filter types
export type FilterType = 'all' | 'active' | 'completed';

// Advanced filters interface
export interface TodoFilters {
  status: FilterType;
  category?: string;
  priority?: Priority;
  tags?: string[];
  dueDateRange?: {
    start?: number;
    end?: number;
  };
}

// Tipos para la base de datos (Supabase usa snake_case)
export interface TodoDB {
  id: string;
  user_id: string;
  text: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  category?: string;
  tags?: string[];
  priority?: Priority;
  due_date?: string; // ISO string en DB
}

// Category DB type
export interface CategoryDB {
  id: string;
  user_id: string;
  name: string;
  color: string;
  icon?: string;
  created_at: string;
  updated_at: string;
}

// Tipos para las respuestas de la API
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface TodosResponse extends ApiResponse<Todo[]> {}
export interface TodoResponse extends ApiResponse<Todo> {}
export interface CategoriesResponse extends ApiResponse<Category[]> {}
export interface CategoryResponse extends ApiResponse<Category> {}
