'use client';

import { useState, KeyboardEvent } from 'react';
import { useTaskContext } from '@/contexts/TaskContext';

export function TaskForm() {
    const { addTask } = useTaskContext();
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newTaskTitle.trim()) {
            addTask(newTaskTitle.trim());
            setNewTaskTitle('');
        }
    };

    return (
        <div className="border-b border-gray-200 hover:border-gray-400 transition-colors">
            <input
                type="text"
                placeholder="Nouvelle tâche... (Appuyez sur Entrée pour ajouter)"
                className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyPress={handleKeyPress}
            />
        </div>
    );
}
