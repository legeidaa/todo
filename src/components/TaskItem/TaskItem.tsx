import { Task } from "@/model/interfaces";
import styles from "./TaskItem.module.scss";
import cn from "classnames";
import { FC } from "react";
import { Checkbox } from "../Checkbox/Checkbox";

interface TaskItemProps {
    taskData: Task;
    onCheckboxChange: (index: number) => void;
    onDeleteTask: (index: number) => void
}

export const TaskItem: FC<TaskItemProps> = (props) => {
    const { taskData, onCheckboxChange, onDeleteTask } = props;

    const handleCheckboxChange = () => {
        onCheckboxChange(taskData.id);
    };

    const handleDeleteTask = () => {
        onDeleteTask(taskData.id)
    }

    return (
        <li
            className={cn(styles.task, {
                [styles.completed]: taskData.completed,
            })}
        >
            <Checkbox
                checked={taskData.completed}
                onChange={handleCheckboxChange}
            />

            <div
                className={cn(styles.taskValue, {
                    [styles.completed]: taskData.completed,
                })}
            >
                {taskData.value}
            </div>
            <div className={styles.buttons}>
                <button className={styles.delete} onClick={handleDeleteTask}>del</button>
            </div>
        </li>
    );
};
