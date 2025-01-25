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
    { id: 2, value: "Lorem ipsum dolor", completed: true },
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

    const handleAddTask = (value: string): void => {
        const newTask: Task = {
            value: value,
            id: Number(new Date()),
            completed: false,
        };
        setTasks((tasks) => [...tasks, newTask]);
    };

    const handleFilterSwitch = (category: FilterCategory): void => {
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
    
    return (
        <main className={styles.page}>
            <section className={styles.task}>
                <header>
                    <AddTaskInput onAddTask={handleAddTask} />
                </header>

                <TasksList
                    tasks={visibleTasks}
                    onCheckboxChange={handleCheckboxChange}
                />

                <footer>
                    <Filter
                        tasks={tasks}
                        activeRadio={activeCategory}
                        onFilterSwitch={handleFilterSwitch}
                    />
                </footer>
            </section>
        </main>
    );
}
