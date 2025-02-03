import { Task } from '@/types/task';
import { useTaskContext } from '@/contexts/TaskContext';

type TaskItemProps = {
    task: Task;
};

export function TaskItem({ task }: TaskItemProps) {
    const { toggleTask } = useTaskContext();

    return (
        <div
            className={`p-4 border-b border-gray-200 flex items-center gap-3 group ${
                task.completed ? 'bg-gray-50' : 'bg-white'
            }`}
        >
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span
                className={`flex-1 ${
                    task.completed ? 'text-gray-500 line-through' : 'text-gray-700'
                }`}
            >
        {task.title}
      </span>
        </div>
    );
}
