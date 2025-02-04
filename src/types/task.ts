export interface Task {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
}

export type TaskContextType = {
    tasks: Task[];
    addTask: (title: string) => void;
    toggleTask: (id: string) => void;
    editTask: (id: string, newTitle: string) => void;
    deleteTask: (id: string) => void;
    clearTasks: () => void;
};
