export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
  userId?: string; // Opcional para compatibilidad con datos existentes
}

export type FilterType = 'all' | 'active' | 'completed';

// Tipos para la base de datos (Supabase usa snake_case)
export interface TodoDB {
  id: string;
  user_id: string;
  text: string;
  completed: boolean;
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
