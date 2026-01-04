'use client';

import { useState } from 'react';
import { Todo } from '@/types/todo';
import { Pencil, Trash2, Check, X } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText);
    } else {
      setEditText(todo.text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`group relative flex items-center gap-4 p-4 bg-white dark:bg-zinc-800/50 border-2 rounded-xl transition-all hover:shadow-lg hover:scale-[1.02] ${
        todo.completed 
          ? 'border-green-200 dark:border-green-900/30 bg-green-50/50 dark:bg-green-900/10' 
          : 'border-zinc-200 dark:border-zinc-700'
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 ${
          todo.completed
            ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-500 focus:ring-green-500'
            : 'border-zinc-300 dark:border-zinc-600 hover:border-blue-500 dark:hover:border-blue-400 focus:ring-blue-500'
        }`}
        aria-label={todo.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
      >
        {todo.completed && (
          <Check className="w-5 h-5 text-white" strokeWidth={3} />
        )}
      </button>

      {/* Text */}
      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyDown}
            className="flex-1 px-3 py-2 text-base border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white"
            autoFocus
          />
          <button
            onClick={handleEdit}
            className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors"
            aria-label="Guardar"
          >
            <Check className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              setEditText(todo.text);
              setIsEditing(false);
            }}
            className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            aria-label="Cancelar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <span
          className={`flex-1 text-base cursor-pointer select-none ${
            todo.completed
              ? 'line-through text-zinc-500 dark:text-zinc-500'
              : 'text-zinc-900 dark:text-white'
          }`}
          onClick={() => setIsEditing(true)}
        >
          {todo.text}
        </span>
      )}

      {/* Actions */}
      {!isEditing && (
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/30 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Editar tarea"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-900/30 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Eliminar tarea"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
