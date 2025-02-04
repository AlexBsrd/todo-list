export interface Task {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
    color?: string
}

export type TaskContextType = {
    tasks: Task[];
    addTask: (title: string) => void;
    toggleTask: (id: string) => void;
    editTask: (id: string, newTitle: string) => void;
    updateTaskColor: (id: string, color: string) => void;
    deleteTask: (id: string) => void;
    clearTasks: () => void;
};
