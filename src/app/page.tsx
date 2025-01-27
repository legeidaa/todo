"use client";
import styles from "./page.module.scss";
import { AddTaskInput } from "@/components/AddTaskInput/AddTaskInput";
import { Filter } from "@/components/Filter/Filter";
import { TasksList } from "@/components/TasksList/TasksList";
import { defaultTasks } from "@/utils/defaultTasks";
import { useTaskHandlers } from "@/hooks/useTaskHandlers";

export default function Home() {
    const {
        tasks,
        activeCategory,
        visibleTasks,
        handleAddTask,
        handleFilterSwitch,
        handleCheckboxChange,
        handleEdit,
        handleDeleteTask,
        clearCompleted,
    } = useTaskHandlers({ initialTasks: defaultTasks });

    return (
        <main className={styles.main}>
            <section className={styles.tasks}>
                <header>
                    <h1 className={styles.title}>TODO</h1>
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
