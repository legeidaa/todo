import { Task } from "@/model/interfaces";
import styles from "./TaskItem.module.scss";
import cn from "classnames";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { Checkbox } from "../Checkbox/Checkbox";

interface TaskItemProps {
    taskData: Task;
    onCheckboxChange: (id: number) => void;
    onDeleteTask: (id: number) => void;
    onEdit: (id: number, value: string) => void;
}

export const TaskItem: FC<TaskItemProps> = (props) => {
    const { taskData, onCheckboxChange, onDeleteTask, onEdit } = props;

    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [value, setValue] = useState<string>(taskData.value);
    const taskDivRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isEditable && taskDivRef.current) {
            taskDivRef.current.focus();
            const selection = window.getSelection();

            if (!selection) return;

            selection.selectAllChildren(taskDivRef.current);
            selection.collapseToEnd();
        }
    }, [isEditable]);

    const handleCheckboxChange = () => {
        onCheckboxChange(taskData.id);
    };

    const handleDeleteTask = () => {
        onDeleteTask(taskData.id);
    };

    const enableEdit = () => {
        setValue(taskData.value);
        setIsEditable(true);
    };

    const disableEdit = () => {
        setValue(taskData.value);
        setIsEditable(false);
    };

    const handleEdit = (e: ChangeEvent<HTMLDivElement>) => {
        const newValue = e.target.textContent || "";
        onEdit(taskData.id, newValue);
    };

    return (
        <li
            className={cn(styles.task, {
                [styles.completed]: taskData.completed,
                [styles.editable]: isEditable,
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
                onInput={handleEdit}
                onBlur={disableEdit}
                contentEditable={isEditable}
                ref={taskDivRef}
                suppressContentEditableWarning
            >
                {value}
            </div>
            <div className={styles.taskButtons}>
                <button className={styles.edit} onClick={enableEdit}>
                    edit
                </button>
                <button className={styles.delete} onClick={handleDeleteTask}>
                    del
                </button>
            </div>
        </li>
    );
};
