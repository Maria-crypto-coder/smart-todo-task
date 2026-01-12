'use client';

import { useState, KeyboardEvent } from 'react';
import { X, Tag } from 'lucide-react';

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  className?: string;
}

export default function TagInput({
  value,
  onChange,
  className = '',
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (trimmedTag && !value.includes(trimmedTag)) {
      onChange([...value, trimmedTag]);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      // Si presiona backspace con input vacío, elimina el último tag
      removeTag(value[value.length - 1]);
    }
  };

  const handleBlur = () => {
    if (inputValue.trim()) {
      addTag(inputValue);
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Etiquetas
      </label>

      {/* Tags display + input */}
      <div className="flex flex-wrap gap-2 p-2 bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 rounded-lg focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
        {/* Existing tags */}
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-md text-sm"
          >
            <Tag className="w-3 h-3" />
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1 hover:bg-blue-200 dark:hover:bg-blue-800/50 rounded-full p-0.5 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}

        {/* Input */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={value.length === 0 ? 'Agregar etiquetas...' : ''}
          className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400"
        />
      </div>

      {/* Helper text */}
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Presiona Enter para agregar. Ej: urgente, trabajo, personal
      </p>

      {/* Suggested tags (opcional - puedes agregar lógica para sugerencias) */}
      {value.length === 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            Sugerencias:
          </span>
          {['urgente', 'importante', 'trabajo', 'personal'].map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => addTag(suggestion)}
              className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors"
            >
              + {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
