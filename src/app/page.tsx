'use client';

import { TaskProvider } from '@/contexts/TaskContext';
import { TaskList } from '@/components/TaskList/TaskList';
import { TaskForm } from '@/components/TaskForm/TaskForm';

export default function Home() {
  return (
      <TaskProvider>
        <main className="min-h-screen bg-gray-100">
          <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="bg-white shadow-sm rounded-lg">
              <TaskForm />
              <TaskList />
            </div>
          </div>
        </main>
      </TaskProvider>
  );
}
