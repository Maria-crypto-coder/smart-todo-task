'use client';

import { useState } from 'react';
import { useCategories } from '@/hooks/useCategories';
import { ChevronDown, Plus, X, Check } from 'lucide-react';

interface CategorySelectorProps {
  value?: string;
  onChange: (category: string) => void;
  className?: string;
}

export default function CategorySelector({
  value,
  onChange,
  className = '',
}: CategorySelectorProps) {
  const { categories, addCategory, isLoading } = useCategories();
  const [isOpen, setIsOpen] = useState(false);
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#3B82F6');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  const selectedCategory = categories.find((cat) => cat.name === value);

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      setError('El nombre es requerido');
      return;
    }

    try {
      setIsCreating(true);
      setError('');
      const newCategory = await addCategory(
        newCategoryName.trim(),
        newCategoryColor
      );
      onChange(newCategory.name);
      setShowNewCategoryModal(false);
      setNewCategoryName('');
      setNewCategoryColor('#3B82F6');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear categoría');
    } finally {
      setIsCreating(false);
    }
  };

  const predefinedColors = [
    '#3B82F6', // blue
    '#10B981', // green
    '#F59E0B', // amber
    '#EF4444', // red
    '#8B5CF6', // purple
    '#EC4899', // pink
    '#06B6D4', // cyan
    '#84CC16', // lime
  ];

  return (
    <div className={`relative ${className}`}>
      {/* Selector Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <div className="flex items-center gap-2">
          {selectedCategory ? (
            <>
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: selectedCategory.color }}
              />
              <span className="text-sm text-zinc-900 dark:text-white">
                {selectedCategory.name}
              </span>
            </>
          ) : (
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              Seleccionar categoría
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-zinc-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-20 mt-2 w-full bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 rounded-lg shadow-xl max-h-64 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-sm text-zinc-500">
                Cargando...
              </div>
            ) : (
              <>
                {/* Clear selection */}
                <button
                  type="button"
                  onClick={() => {
                    onChange('');
                    setIsOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Sin categoría
                </button>

                {/* Categories list */}
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      onChange(category.name);
                      setIsOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-zinc-900 dark:text-white">
                        {category.name}
                      </span>
                    </div>
                    {value === category.name && (
                      <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    )}
                  </button>
                ))}

                {/* Create new category button */}
                <button
                  type="button"
                  onClick={() => {
                    setShowNewCategoryModal(true);
                    setIsOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center gap-2 border-t border-zinc-200 dark:border-zinc-700"
                >
                  <Plus className="w-4 h-4" />
                  Nueva categoría
                </button>
              </>
            )}
          </div>
        </>
      )}

      {/* New Category Modal */}
      {showNewCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Nueva Categoría
              </h3>
              <button
                onClick={() => {
                  setShowNewCategoryModal(false);
                  setError('');
                  setNewCategoryName('');
                }}
                className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-zinc-500" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Name input */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Ej: Trabajo, Personal, Urgente"
                  className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-900 dark:text-white"
                  autoFocus
                />
              </div>

              {/* Color picker */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Color
                </label>
                <div className="grid grid-cols-8 gap-2">
                  {predefinedColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewCategoryColor(color)}
                      className={`w-8 h-8 rounded-lg transition-all ${
                        newCategoryColor === color
                          ? 'ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-zinc-800'
                          : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowNewCategoryModal(false);
                    setError('');
                    setNewCategoryName('');
                  }}
                  className="flex-1 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-700 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors"
                  disabled={isCreating}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleCreateCategory}
                  disabled={isCreating || !newCategoryName.trim()}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreating ? 'Creando...' : 'Crear'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
