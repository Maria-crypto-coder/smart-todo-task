'use client';

import { useCategories } from '@/hooks/useCategories';

interface CategoryBadgeProps {
  categoryName: string;
  size?: 'sm' | 'md';
  className?: string;
}

export default function CategoryBadge({
  categoryName,
  size = 'sm',
  className = '',
}: CategoryBadgeProps) {
  const { getCategoryByName } = useCategories();
  const category = getCategoryByName(categoryName);

  if (!category) {
    return null;
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  // Crear estilos inline para el badge
  const badgeStyle = {
    backgroundColor: `${category.color}20`,
    color: category.color,
    borderColor: `${category.color}40`,
    borderWidth: '1px',
  };

  const dotStyle = {
    backgroundColor: category.color,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${sizeClasses[size]} ${className}`}
      style={badgeStyle}
    >
      <span className="w-2 h-2 rounded-full" style={dotStyle} />
      {category.name}
    </span>
  );
}
