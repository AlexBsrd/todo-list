import React, { useState, KeyboardEvent } from 'react';
import { Plus } from 'lucide-react';
import { useTaskContext } from '@/contexts/TaskContext';

export function TaskForm() {
    const { addTask } = useTaskContext();
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const handleSubmit = () => {
        if (newTaskTitle.trim()) {
            addTask(newTaskTitle.trim());
            setNewTaskTitle('');
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex gap-3">
                <input
                    type="text"
                    placeholder="Ajouter une nouvelle tâche..."
                    className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600
                             bg-white dark:bg-gray-700
                             text-gray-900 dark:text-gray-100
                             hover:border-gray-300 dark:hover:border-gray-500
                             focus:border-blue-500 dark:focus:border-blue-400
                             focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900
                             focus:outline-none transition-all duration-200"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <button
                    onClick={handleSubmit}
                    disabled={!newTaskTitle.trim()}
                    className="px-4 sm:px-6 py-2.5 bg-blue-500 text-white rounded-lg
                             hover:bg-blue-600
                             focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900
                             focus:outline-none transition-all duration-200
                             disabled:opacity-50 disabled:cursor-not-allowed
                             flex items-center gap-2 font-medium"
                >
                    <Plus className="h-5 w-5" />
                    <span className="hidden sm:inline">Ajouter</span>
                </button>
            </div>
        </div>
    );
}
