'use client';

import { Calendar, X } from 'lucide-react';

interface DatePickerProps {
  value?: number; // timestamp
  onChange: (date: number | undefined) => void;
  className?: string;
}

export default function DatePicker({
  value,
  onChange,
  className = '',
}: DatePickerProps) {
  // Convertir timestamp a formato YYYY-MM-DD para el input
  const dateValue = value ? new Date(value).toISOString().split('T')[0] : '';

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateStr = e.target.value;
    if (dateStr) {
      // Convertir a timestamp (inicio del día en hora local)
      const date = new Date(dateStr + 'T00:00:00');
      onChange(date.getTime());
    } else {
      onChange(undefined);
    }
  };

  const setQuickDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    date.setHours(0, 0, 0, 0);
    onChange(date.getTime());
  };

  const clearDate = () => {
    onChange(undefined);
  };

  // Formatear fecha para mostrar
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.getTime() === today.getTime()) {
      return 'Hoy';
    } else if (date.getTime() === tomorrow.getTime()) {
      return 'Mañana';
    } else {
      return date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
      });
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Fecha de vencimiento
      </label>

      <div className="flex gap-2">
        {/* Date input */}
        <div className="flex-1 relative">
          <input
            type="date"
            value={dateValue}
            onChange={handleDateChange}
            className="w-full px-3 py-2 pl-10 bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-900 dark:text-white text-sm"
          />
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
        </div>

        {/* Clear button */}
        {value && (
          <button
            type="button"
            onClick={clearDate}
            className="px-3 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors"
            title="Limpiar fecha"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Quick date buttons */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setQuickDate(0)}
          className="flex-1 px-3 py-1.5 text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
        >
          Hoy
        </button>
        <button
          type="button"
          onClick={() => setQuickDate(1)}
          className="flex-1 px-3 py-1.5 text-xs font-medium bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
        >
          Mañana
        </button>
        <button
          type="button"
          onClick={() => setQuickDate(7)}
          className="flex-1 px-3 py-1.5 text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
        >
          En 1 semana
        </button>
      </div>

      {/* Show selected date */}
      {value && (
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          Vence: {formatDate(value)}
        </div>
      )}
    </div>
  );
}
