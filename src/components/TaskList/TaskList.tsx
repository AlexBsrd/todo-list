'use client';

import { useTaskContext } from '@/contexts/TaskContext';
import { TaskItem } from './TaskItem';
import { useEffect, useState } from 'react';

export function TaskList() {
    const { tasks } = useTaskContext();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null; // TODO utiliser un skeleton
    }

    return (
        <div className="space-y-1">
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    );
}
