'use client';

import { Priority } from '@/types/todo';
import { AlertCircle, Minus, ArrowDown } from 'lucide-react';

interface PriorityBadgeProps {
  priority: Priority;
  size?: 'sm' | 'md';
  showIcon?: boolean;
  className?: string;
}

const priorityConfig = {
  high: {
    label: 'Alta',
    color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-300 dark:border-red-800',
    icon: AlertCircle,
  },
  medium: {
    label: 'Media',
    color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800',
    icon: Minus,
  },
  low: {
    label: 'Baja',
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-800',
    icon: ArrowDown,
  },
};

export default function PriorityBadge({
  priority,
  size = 'sm',
  showIcon = true,
  className = '',
}: PriorityBadgeProps) {
  const config = priorityConfig[priority];
  const Icon = config.icon;

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
      className={`inline-flex items-center gap-1 rounded-full font-medium border ${config.color} ${sizeClasses[size]} ${className}`}
    >
      {showIcon && <Icon className={iconSizeClasses[size]} />}
      {config.label}
    </span>
  );
}
