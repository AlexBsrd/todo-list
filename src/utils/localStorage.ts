import { Task } from '@/types/task';

const TASKS_KEY = 'tasks';

export function loadTasks(): Task[] {
    if (typeof window === 'undefined') return [];

    const stored = localStorage.getItem(TASKS_KEY);
    if (!stored) return [];

    try {
        return JSON.parse(stored, (key, value) => {
            if (key === 'createdAt') return new Date(value);
            return value;
        });
    } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
        return [];
    }
}

export function saveTasks(tasks: Task[]): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
    }
}
