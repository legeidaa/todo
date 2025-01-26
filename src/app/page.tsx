"use client";
import { useMemo, useState } from "react";
import styles from "./page.module.scss";
import { FilterCategory, Task } from "@/model/interfaces";
import { AddTaskInput } from "@/components/AddTaskInput/AddTaskInput";
import { Filter } from "@/components/Filter/Filter";
import { filterTasks } from "@/utils/filterTasks";
import { TasksList } from "@/components/TasksList/TasksList";

const defaultTasks: Task[] = [
    { id: 1, value: "Lorem ipsum", completed: false },
    { id: 2, value: "Lorem ipsum dolor Lorem ", completed: true },
];

export default function Home() {
    const [tasks, setTasks] = useState<Task[]>(defaultTasks);
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

    return (
        <main className={styles.page}>
            <section className={styles.task}>
                <header>
                    <AddTaskInput onAddTask={handleAddTask} />
                </header>

                <TasksList
                    tasks={visibleTasks}
                    onCheckboxChange={handleCheckboxChange}
                    onDeleteTask={handleDeleteTask}
                    onEdit={handleEdit}
                />

                <footer>
                    <Filter
                        tasks={tasks}
                        activeRadio={activeCategory}
                        onFilterSwitch={handleFilterSwitch}
                        onClearCompletedClick={clearCompleted}
                    />
                </footer>
            </section>
        </main>
    );
}
