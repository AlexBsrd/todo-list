'use client';

import { TaskProvider } from '@/contexts/TaskContext';
import { TaskList } from '@/components/TaskList/TaskList';
import { TaskForm } from '@/components/TaskForm/TaskForm';

export default function Home() {
    return (
        <TaskProvider>
            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                        Mes tâches
                    </h1>
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-100 dark:border-gray-700">
                        <TaskForm />
                        <TaskList />
                    </div>
                </div>
            </main>
        </TaskProvider>
    );
}
