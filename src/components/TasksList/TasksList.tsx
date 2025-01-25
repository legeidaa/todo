import { Task } from "@/model/interfaces";
import styles from "./TasksList.module.css";
import { FC } from "react";
import { TaskItem } from "../TaskItem/TaskItem";

interface TasksListProps {
    tasks: Task[];
}

export const TasksList: FC<TasksListProps> = (props) => {
    const { tasks } = props;

    return (
        <div className={styles.listWrapper}>
            {tasks.length === 0 && (
                <div className={styles.emptyList}>
                    There are no tasks in this category
                </div>
            )}
            <ul className={styles.list}>
                {tasks.map((task) => (
                    <TaskItem key={task.id} taskData={task} />
                ))}
            </ul>
        </div>
    );
};
