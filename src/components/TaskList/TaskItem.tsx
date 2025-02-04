import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Trash2, Check, Pencil, X } from 'lucide-react';
import { Task } from '@/types/task';
import { useTaskContext } from '@/contexts/TaskContext';

type TaskItemProps = {
    task: Task;
};

const COLORS = [
    { name: 'default', bg: 'hover:bg-gray-50 dark:hover:bg-gray-700/50', dot: 'bg-gray-300 dark:bg-gray-600' },
    { name: 'red', bg: 'bg-red-50 dark:bg-red-950/40 hover:bg-red-100/80 dark:hover:bg-red-900/50', dot: 'bg-red-500 dark:bg-red-400' },
    { name: 'green', bg: 'bg-green-50 dark:bg-green-950/40 hover:bg-green-100/80 dark:hover:bg-green-900/50', dot: 'bg-green-500 dark:bg-green-400' },
    { name: 'blue', bg: 'bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100/80 dark:hover:bg-blue-900/50', dot: 'bg-blue-500 dark:bg-blue-400' },
    { name: 'yellow', bg: 'bg-yellow-50 dark:bg-yellow-950/40 hover:bg-yellow-100/80 dark:hover:bg-yellow-900/50', dot: 'bg-yellow-500 dark:bg-yellow-400' },
    { name: 'purple', bg: 'bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100/80 dark:hover:bg-purple-900/50', dot: 'bg-purple-500 dark:bg-purple-400' },
];

const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
};

export function TaskItem({ task }: TaskItemProps) {
    const { toggleTask, deleteTask, editTask, updateTaskColor } = useTaskContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const colorPickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    useEffect(() => {
        // Pour fermer le color picker au clic sur un autre endroit de la page
        function handleClickOutside(event: MouseEvent) {
            if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
                setIsColorPickerOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        // Note: en appli prod, peut-être risqué de binder une fonction sur cet évènement au risque de ralentir
        // les perfs de l'appli ?
        return () => document.removeEventListener('mousedown', handleClickOutside); //cleanup function, je ne connaissais pas ce concept
    }, []);

    const handleEdit = () => {
        if (editedTitle.trim() && editedTitle !== task.title) {
            editTask(task.id, editedTitle.trim());
        }
        setIsEditing(false);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleEdit();
        } else if (e.key === 'Escape') {
            setEditedTitle(task.title);
            setIsEditing(false);
        }
    };

    const handleCancelEdit = () => {
        setEditedTitle(task.title);
        setIsEditing(false);
    };

    return (
        <div className={`group p-6 border-b border-gray-100 dark:border-gray-700 
                        flex items-center gap-4 transition-all duration-200
                        ${task.color ? COLORS.find(c => c.name === task.color)?.bg : 'bg-white dark:bg-gray-800'}
                        hover:brightness-95 dark:hover:brightness-110
                        ${task.completed ? 'opacity-60' : ''}`}>
            <button
                onClick={() => toggleTask(task.id)}
                className={`flex items-center justify-center h-5 w-5 rounded-full border-2 
                           transition-colors duration-200 ${
                    task.completed
                        ? 'bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600'
                        : 'border-gray-300 dark:border-gray-500 hover:border-gray-400 dark:hover:border-gray-400'
                }`}
            >
                {task.completed && <Check className="h-3 w-3 text-white" />}
            </button>

            {isEditing ? (
                <div className="flex-1 flex items-center gap-2">
                    <input
                        ref={inputRef}
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="flex-1 px-2 py-1 rounded border border-gray-200 dark:border-gray-600
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                 focus:border-blue-500 dark:focus:border-blue-400
                                 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900
                                 focus:outline-none transition-all duration-200"
                    />
                    <button
                        onClick={handleEdit}
                        className="p-1 text-green-500 hover:text-green-600
                                 dark:text-green-400 dark:hover:text-green-300"
                        aria-label="Valider"
                    >
                        <Check className="h-4 w-4" />
                    </button>
                    <button
                        onClick={handleCancelEdit}
                        className="p-1 text-gray-400 hover:text-gray-600
                                 dark:text-gray-500 dark:hover:text-gray-300"
                        aria-label="Annuler"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            ) : (
                <span className={`flex-1 transition-all duration-200 ${
                    task.completed
                        ? 'text-gray-500 dark:text-gray-400 line-through'
                        : 'text-gray-900 dark:text-gray-100'
                }`}>
                    {task.title}
                </span>
            )}

            <div className="relative w-32 flex justify-end">
                <span className="text-sm text-gray-400 dark:text-gray-500 group-hover:opacity-0 transition-opacity duration-200">
                    {formatDate(task.createdAt)}
                </span>
                <div className="absolute inset-y-0 right-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="relative" ref={colorPickerRef}>
                        <button
                            onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                            className="flex items-center text-gray-400 hover:text-gray-600
                                     dark:text-gray-500 dark:hover:text-gray-300"
                            aria-label="Changer la couleur"
                        >
                            <div className={`w-4 h-4 rounded-full border border-gray-200 dark:border-gray-700
                                          ${task.color ? COLORS.find(c => c.name === task.color)?.dot : 'bg-gray-300 dark:bg-gray-600'}`} />
                        </button>

                        {isColorPickerOpen && (
                            <div className="absolute right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg
                                          border border-gray-200 dark:border-gray-700 p-2 z-10">
                                <div className="flex gap-1">
                                    {COLORS.map((color) => (
                                        <button
                                            key={color.name}
                                            onClick={() => {
                                                updateTaskColor(task.id, color.name);
                                                setIsColorPickerOpen(false);
                                            }}
                                            className={`w-6 h-6 rounded-full ${color.bg} border border-gray-200 
                                                      dark:border-gray-600 hover:scale-110 transition-transform`}
                                            aria-label={`Couleur ${color.name}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center text-gray-400 hover:text-blue-500
                                 dark:text-gray-500 dark:hover:text-blue-400"
                        aria-label="Modifier la tâche"
                    >
                        <Pencil className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => deleteTask(task.id)}
                        className="flex items-center text-gray-400 hover:text-red-500
                                 dark:text-gray-500 dark:hover:text-red-400"
                        aria-label="Supprimer la tâche"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
