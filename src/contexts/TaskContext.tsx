import { createContext, useContext, useEffect, useState } from 'react';
import { Task, TaskContextType } from '@/types/task';
import { loadTasks, saveTasks } from '@/utils/localStorage';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Charger les tâches uniquement après le montage du composant
    useEffect(() => {
        setTasks(loadTasks());
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            saveTasks(tasks);
        }
    }, [tasks, isLoaded]);

    const addTask = (title: string) => {
        const newTask: Task = {
            id: crypto.randomUUID(),
            title,
            completed: false,
            createdAt: new Date(),
        };
        setTasks((prev) => [...prev, newTask]);
    };

    const toggleTask = (id: string) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (id: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const clearTasks = () => {
        setTasks([]);
    };

    const editTask = (id: string, newTitle: string) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, title: newTitle } : task
            )
        );
    };

    const updateTaskColor = (id: string, color: string) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, color } : task
            )
        );
        // Note: pour l'instant c'est plus clair de faire une fonction par attribut
        // mais il faudra réfléchir à factoriser tout ça dans une fonction updateAttribute(key, value)
    };

    return (
        <TaskContext.Provider
            value={{ tasks, addTask, toggleTask, editTask, updateTaskColor, deleteTask, clearTasks }}
        >
            {children}
        </TaskContext.Provider>
    );
}

export function useTaskContext() {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
}
