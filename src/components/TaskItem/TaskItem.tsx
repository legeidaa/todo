import { Task } from "@/model/interfaces";
import styles from "./TaskItem.module.css";
import cn from "classnames";
import { FC } from "react";

interface TaskItemProps {
    taskData: Task;
}

export const TaskItem: FC<TaskItemProps> = (props) => {
    const { taskData } = props;
    return (
        <li className={cn(styles.task)}>
            <div
                className={cn(styles.taskValue, {
                    [styles.completed]: taskData.completed,
                })}
            >
                {taskData.value}
            </div>
        </li>
    );
};
