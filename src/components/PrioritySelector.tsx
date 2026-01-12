'use client';

import { Priority } from '@/types/todo';
import { AlertCircle, Minus, ArrowDown } from 'lucide-react';

interface PrioritySelectorProps {
  value?: Priority;
  onChange: (priority: Priority | undefined) => void;
  className?: string;
}

const priorities: { value: Priority; label: string; color: string; icon: React.ReactNode }[] = [
  {
    value: 'high',
    label: 'Alta',
    color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-300 dark:border-red-800',
    icon: <AlertCircle className="w-4 h-4" />,
  },
  {
    value: 'medium',
    label: 'Media',
    color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800',
    icon: <Minus className="w-4 h-4" />,
  },
  {
    value: 'low',
    label: 'Baja',
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-800',
    icon: <ArrowDown className="w-4 h-4" />,
  },
];

export default function PrioritySelector({
  value,
  onChange,
  className = '',
}: PrioritySelectorProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Prioridad
      </label>
      <div className="flex gap-2">
        {priorities.map((priority) => {
          const isSelected = value === priority.value;
          return (
            <button
              key={priority.value}
              type="button"
              onClick={() => {
                // Toggle: si ya está seleccionada, la deselecciona
                onChange(isSelected ? undefined : priority.value);
              }}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border-2 transition-all ${
                isSelected
                  ? priority.color + ' font-medium'
                  : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600'
              }`}
            >
              {priority.icon}
              <span className="text-sm">{priority.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
