import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useTaskContext } from '@/contexts/TaskContext';
import { TaskItem } from './TaskItem';
import { TaskSearch } from '../TaskSearch/TaskSearch';

export function TaskList() {
    const { tasks, clearTasks } = useTaskContext();
    const [mounted, setMounted] = useState(false);
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        setFilteredTasks(
            tasks.filter((task) =>
                task.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [tasks, searchTerm]);

    if (!mounted) {
        return null;
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
                <TaskSearch onSearch={setSearchTerm} />
                {tasks.length > 0 && (
                    <button
                        onClick={clearTasks}
                        className="ml-4 px-3 sm:px-4 py-2 text-red-500 hover:text-red-600
                                 dark:text-red-400 dark:hover:text-red-300
                                 focus:outline-none flex items-center gap-2
                                 transition-colors duration-200 font-medium whitespace-nowrap"
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="hidden sm:inline">Supprimer toutes les tâches</span>
                        <span className="sm:hidden">Tout supprimer</span>
                    </button>
                )}
            </div>

            <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))
                ) : (
                    <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                        {searchTerm ? 'Aucune tâche ne correspond à votre recherche' : 'Aucune tâche pour le moment'}
                    </div>
                )}
            </div>
        </div>
    );
}
