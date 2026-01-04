'use client';

import { FilterType } from '@/types/todo';
import { ListTodo, CheckCircle2, Circle, Trash2 } from 'lucide-react';

interface TodoFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  stats: {
    total: number;
    active: number;
    completed: number;
  };
  onClearCompleted: () => void;
}

export default function TodoFilters({
  currentFilter,
  onFilterChange,
  stats,
  onClearCompleted,
}: TodoFiltersProps) {
  const filters: { value: FilterType; label: string; icon: any }[] = [
    { value: 'all', label: 'Todas', icon: ListTodo },
    { value: 'active', label: 'Activas', icon: Circle },
    { value: 'completed', label: 'Completadas', icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-4 pt-6 border-t-2 border-zinc-200 dark:border-zinc-800">
      {/* Stats */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            <span className="font-bold text-lg text-blue-600 dark:text-blue-400">
              {stats.active}
            </span>{' '}
            {stats.active === 1 ? 'tarea pendiente' : 'tareas pendientes'}
          </span>
        </div>

        {stats.completed > 0 && (
          <button
            onClick={onClearCompleted}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Limpiar completadas
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = currentFilter === filter.value;
          const count = 
            filter.value === 'all' ? stats.total :
            filter.value === 'active' ? stats.active :
            stats.completed;

          return (
            <button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:scale-105'
              }`}
            >
              <Icon className="w-4 h-4" />
              {filter.label}
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                isActive 
                  ? 'bg-white/20' 
                  : 'bg-zinc-200 dark:bg-zinc-700'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
