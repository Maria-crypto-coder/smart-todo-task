'use client';

import { Calendar, AlertCircle } from 'lucide-react';

interface DueDateIndicatorProps {
  dueDate: number; // timestamp
  completed?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export default function DueDateIndicator({
  dueDate,
  completed = false,
  size = 'sm',
  className = '',
}: DueDateIndicatorProps) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const today = now.getTime();

  const dueDateTime = new Date(dueDate);
  dueDateTime.setHours(0, 0, 0, 0);
  const dueDateOnly = dueDateTime.getTime();

  const diffDays = Math.floor((dueDateOnly - today) / (1000 * 60 * 60 * 24));

  // Determinar el estado y color
  let status: 'overdue' | 'today' | 'soon' | 'later' = 'later';
  let colorClasses = '';
  let showAlert = false;

  if (completed) {
    // Si está completada, mostrar en verde suave
    colorClasses = 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-300 dark:border-green-800';
  } else if (diffDays < 0) {
    // Vencida
    status = 'overdue';
    colorClasses = 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-300 dark:border-red-800';
    showAlert = true;
  } else if (diffDays === 0) {
    // Hoy
    status = 'today';
    colorClasses = 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-300 dark:border-orange-800';
    showAlert = true;
  } else if (diffDays <= 7) {
    // Esta semana
    status = 'soon';
    colorClasses = 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800';
  } else {
    // Más de una semana
    status = 'later';
    colorClasses = 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-800';
  }

  // Formatear fecha
  const formatDate = () => {
    const date = new Date(dueDate);
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Mañana';
    if (diffDays === -1) return 'Ayer';
    if (diffDays < -1) return `Hace ${Math.abs(diffDays)} días`;
    if (diffDays <= 7) return `En ${diffDays} días`;

    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium border ${colorClasses} ${sizeClasses[size]} ${className}`}
    >
      {showAlert && !completed ? (
        <AlertCircle className={iconSizeClasses[size]} />
      ) : (
        <Calendar className={iconSizeClasses[size]} />
      )}
      {formatDate()}
    </span>
  );
}
