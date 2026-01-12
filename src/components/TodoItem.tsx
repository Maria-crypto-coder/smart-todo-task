'use client';

import { useState } from 'react';
import { Todo, Priority } from '@/types/todo';
import { Pencil, Trash2, Check, X, Tag } from 'lucide-react';
import CategoryBadge from './CategoryBadge';
import PriorityBadge from './PriorityBadge';
import DueDateIndicator from './DueDateIndicator';
import CategorySelector from './CategorySelector';
import PrioritySelector from './PrioritySelector';
import DatePicker from './DatePicker';
import TagInput from './TagInput';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: {
    text?: string;
    category?: string;
    tags?: string[];
    priority?: Priority;
    due_date?: number;
  }) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editCategory, setEditCategory] = useState(todo.category || '');
  const [editTags, setEditTags] = useState(todo.tags || []);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [editDueDate, setEditDueDate] = useState(todo.due_date);

  const handleEdit = () => {
    if (!editText.trim()) {
      // Si el texto está vacío, no guardar
      setEditText(todo.text);
      setIsEditing(false);
      return;
    }

    // Verificar si algo cambió
    const hasChanges = 
      editText !== todo.text ||
      editCategory !== (todo.category || '') ||
      JSON.stringify(editTags) !== JSON.stringify(todo.tags || []) ||
      editPriority !== todo.priority ||
      editDueDate !== todo.due_date;

    if (hasChanges) {
      onEdit(todo.id, {
        text: editText,
        category: editCategory || undefined,
        tags: editTags,
        priority: editPriority,
        due_date: editDueDate,
      });
    }
    
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditCategory(todo.category || '');
      setEditTags(todo.tags || []);
      setEditPriority(todo.priority);
      setEditDueDate(todo.due_date);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`group relative flex flex-col gap-3 p-4 bg-white dark:bg-zinc-800/50 border-2 rounded-xl transition-all hover:shadow-lg ${
        todo.completed 
          ? 'border-green-200 dark:border-green-900/30 bg-green-50/50 dark:bg-green-900/10' 
          : 'border-zinc-200 dark:border-zinc-700'
      }`}
    >
      {/* Main row: Checkbox + Text + Actions */}
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 mt-0.5 rounded-lg border-2 flex items-center justify-center transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 ${
            todo.completed
              ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-500 focus:ring-green-500'
              : 'border-zinc-300 dark:border-zinc-600 hover:border-blue-500 dark:hover:border-blue-400 focus:ring-blue-500'
          }`}
          aria-label={todo.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
        >
          {todo.completed && (
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          )}
        </button>

        {/* Text */}
        {isEditing ? (
          <div className="flex-1 space-y-3">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-2 text-base border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white"
              autoFocus
            />
            
            {/* Edit fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <CategorySelector
                value={editCategory}
                onChange={setEditCategory}
              />
              <DatePicker
                value={editDueDate}
                onChange={setEditDueDate}
              />
            </div>

            <PrioritySelector
              value={editPriority}
              onChange={setEditPriority}
            />

            <TagInput
              value={editTags}
              onChange={setEditTags}
            />

            {/* Edit actions */}
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Check className="w-4 h-4" />
                Guardar
              </button>
              <button
                onClick={() => {
                  setEditText(todo.text);
                  setEditCategory(todo.category || '');
                  setEditTags(todo.tags || []);
                  setEditPriority(todo.priority);
                  setEditDueDate(todo.due_date);
                  setIsEditing(false);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors font-medium"
              >
                <X className="w-4 h-4" />
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 min-w-0">
              <span
                className={`block text-base cursor-pointer select-none break-words ${
                  todo.completed
                    ? 'line-through text-zinc-500 dark:text-zinc-500'
                    : 'text-zinc-900 dark:text-white'
                }`}
                onClick={() => setIsEditing(true)}
              >
                {todo.text}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
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
          </>
        )}
      </div>

      {/* Badges row */}
      {!isEditing && (todo.category || todo.priority || todo.due_date || (todo.tags && todo.tags.length > 0)) && (
        <div className="flex flex-wrap gap-2 ml-9">
          {todo.category && <CategoryBadge categoryName={todo.category} />}
          {todo.priority && <PriorityBadge priority={todo.priority} />}
          {todo.due_date && <DueDateIndicator dueDate={todo.due_date} completed={todo.completed} />}
          {todo.tags && todo.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {todo.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 rounded-full text-xs"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
