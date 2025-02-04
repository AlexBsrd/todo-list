import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Trash2, Check, Pencil, X } from 'lucide-react';
import { Task } from '@/types/task';
import { useTaskContext } from '@/contexts/TaskContext';

type TaskItemProps = {
    task: Task;
};

const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
};

export function TaskItem({ task }: TaskItemProps) {
    const { toggleTask, deleteTask, editTask } = useTaskContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

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
                        hover:bg-gray-50 dark:hover:bg-gray-700/50 
                        ${task.completed ? 'bg-gray-50 dark:bg-gray-700/50' : ''}`}>
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
