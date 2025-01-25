"use client";
import { useMemo, useState } from "react";
import styles from "./page.module.css";
import { FilterCategory, Task } from "@/model/interfaces";
import { TaskItem } from "@/components/TaskItem/TaskItem";
import { AddTaskInput } from "@/components/AddTaskInput/AddTaskInput";
import { Filter } from "@/components/Filter/Filter";
import { filterTasks } from "@/utils/filterTasks";

const defaultTasks: Task[] = [
    { id: 1, value: "Lorem ipsum", completed: false },
    { id: 2, value: "Lorem ipsum dolor", completed: true },
];

export default function Home() {
    const [tasks, setTasks] = useState<Task[]>(defaultTasks);
    const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");
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
        console.log(category);

        switch (category) {
            case "all":
                setActiveCategory("all");
                break;

            case "active":
                setActiveCategory("active");
                break;

            case "completed":
                setActiveCategory("completed");
                break;
        }
    };

    return (
        <main className={styles.page}>
            <section className={styles.task}>
                <header>
                    <AddTaskInput onAddTask={handleAddTask} />
                </header>
                <ul>
                    {visibleTasks.map((task) => (
                        <TaskItem key={task.id} taskData={task} />
                    ))}
                </ul>
                <footer>
                    <Filter
                        // activeCount={activeTasks.length}
                        activeRadio={activeCategory}
                        onFilterSwitch={handleFilterSwitch}
                    />
                </footer>
            </section>
        </main>
    );
}
