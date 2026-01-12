'use client';

import { useState, FormEvent } from 'react';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { Priority } from '@/types/todo';
import CategorySelector from './CategorySelector';
import PrioritySelector from './PrioritySelector';
import DatePicker from './DatePicker';
import TagInput from './TagInput';

interface TodoFormProps {
  onAdd: (text: string, options?: {
    category?: string;
    tags?: string[];
    priority?: Priority;
    due_date?: number;
  }) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [input, setInput] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [priority, setPriority] = useState<Priority | undefined>();
  const [dueDate, setDueDate] = useState<number | undefined>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      try {
        const options = {
          category: category || undefined,
          tags: tags.length > 0 ? tags : undefined,
          priority,
          due_date: dueDate,
        };
        
        console.log('TodoForm - Submitting with options:', options);
        
        await onAdd(input, options);
        
        // Reset form
        setInput('');
        setCategory('');
        setTags([]);
        setPriority(undefined);
        setDueDate(undefined);
        setShowAdvanced(false);
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const hasAdvancedFields = category || tags.length > 0 || priority || dueDate;

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="space-y-4">
        {/* Main input */}
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="¿Qué necesitas hacer hoy?"
            className="w-full px-6 py-4 pr-14 text-base border-2 border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-400 transition-all shadow-sm hover:shadow-md"
            autoFocus
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 transition-all active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Agregar tarea"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Toggle advanced options */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          {showAdvanced ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Ocultar opciones
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Más opciones
              {hasAdvancedFields && (
                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium">
                  {[category, priority, dueDate, tags.length > 0].filter(Boolean).length}
                </span>
              )}
            </>
          )}
        </button>

        {/* Advanced options */}
        {showAdvanced && (
          <div className="space-y-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border-2 border-zinc-200 dark:border-zinc-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Categoría
                </label>
                <CategorySelector
                  value={category}
                  onChange={setCategory}
                />
              </div>

              <div>
                <DatePicker
                  value={dueDate}
                  onChange={setDueDate}
                />
              </div>
            </div>

            <PrioritySelector
              value={priority}
              onChange={setPriority}
            />

            <TagInput
              value={tags}
              onChange={setTags}
            />
          </div>
        )}
      </div>
    </form>
  );
}
