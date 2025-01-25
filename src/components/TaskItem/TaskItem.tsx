import { Task } from "@/model/interfaces";
import styles from "./TaskItem.module.scss";
import cn from "classnames";
import { FC } from "react";
import { Checkbox } from "../Checkbox/Checkbox";

interface TaskItemProps {
    taskData: Task;
    onCheckboxChange: (index: number) => void;
}

export const TaskItem: FC<TaskItemProps> = (props) => {
    const { taskData, onCheckboxChange } = props;

    const handleCheckboxChange = () => {
        onCheckboxChange(taskData.id);
    };

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
        </li>
    );
};
