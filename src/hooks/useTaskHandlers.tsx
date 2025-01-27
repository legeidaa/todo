import { FilterCategory, Task } from "@/model/interfaces";
import { filterTasks } from "@/utils/filterTasks";
import { useMemo, useState } from "react";

interface UseTaskHandlersProps {
    initialTasks: Task[];
}

interface UseTaskHandlersReturn {
    tasks: Task[];
    activeCategory: FilterCategory;
    visibleTasks: Task[];
    handleAddTask: (value: string) => void;
    handleFilterSwitch: (category: FilterCategory) => void;
    handleCheckboxChange: (id: number) => void;
    handleEdit: (id: number, value: string) => void;
    handleDeleteTask: (id: number) => void;
    clearCompleted: () => void;
}

export const useTaskHandlers = ({
    initialTasks,
}: UseTaskHandlersProps): UseTaskHandlersReturn => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [activeCategory, setActiveCategory] = useState<FilterCategory>(
        FilterCategory.ALL
    );
    const visibleTasks = useMemo(
        () => filterTasks(tasks, activeCategory),
        [activeCategory, tasks]
    );

    const handleAddTask = (value: string) => {
        const newTask: Task = {
            value: value,
            id: Number(new Date()),
            completed: false,
        };
        setTasks((tasks) => [...tasks, newTask]);
    };

    const handleFilterSwitch = (category: FilterCategory) => {
        switch (category) {
            case FilterCategory.ALL:
                setActiveCategory(FilterCategory.ALL);
                break;

            case FilterCategory.ACTIVE:
                setActiveCategory(FilterCategory.ACTIVE);
                break;

            case FilterCategory.COMPLETED:
                setActiveCategory(FilterCategory.COMPLETED);
                break;
            default:
                throw new Error("Invalid category");
        }
    };

    const handleCheckboxChange = (id: number) => {
        setTasks((tasks) =>
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleEdit = (id: number, newValue: string) => {
        setTasks((tasks) =>
            tasks.map((task) =>
                task.id === id ? { ...task, value: newValue } : task
            )
        );
    };

    const handleDeleteTask = (id: number) => {
        setTasks((tasks) => tasks.filter((task) => task.id !== id));
    };

    const clearCompleted = () => {
        setTasks((tasks) => tasks.filter((task) => !task.completed));
    };

    return {
        tasks,
        activeCategory,
        visibleTasks,
        handleAddTask,
        handleFilterSwitch,
        handleCheckboxChange,
        handleEdit,
        handleDeleteTask,
        clearCompleted,
    };
};
