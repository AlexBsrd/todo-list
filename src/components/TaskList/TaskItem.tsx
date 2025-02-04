import React from 'react';
import { Trash2, Check } from 'lucide-react';
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
    const { toggleTask, deleteTask } = useTaskContext();

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

            <span className={`flex-1 transition-all duration-200 ${
                task.completed
                    ? 'text-gray-500 dark:text-gray-400 line-through'
                    : 'text-gray-900 dark:text-gray-100'
            }`}>
                {task.title}
            </span>

            <div className="relative w-32 flex justify-end">
                <span className="text-sm text-gray-400 dark:text-gray-500 group-hover:opacity-0 transition-opacity duration-200">
                    {formatDate(task.createdAt)}
                </span>
                <button
                    onClick={() => deleteTask(task.id)}
                    className="absolute inset-y-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200
                             flex items-center text-gray-400 hover:text-red-500
                             dark:text-gray-500 dark:hover:text-red-400"
                    aria-label="Supprimer la tâche"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
