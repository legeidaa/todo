import styles from "./AddTaskInput.module.scss";
import { ChangeEvent, FC, useState } from "react";

interface AddTaskInputProps {
    onAddTask: (value: string) => void;
}

export const AddTaskInput: FC<AddTaskInputProps> = (props) => {
    const { onAddTask } = props;
    const [value, setValue] = useState<string>("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setValue(e.target.value);
    };

    const handleAddBtnClick = () => {
        onAddTask(value);
        setValue("");
    };

    return (
        <div className={styles.wrapper}>
            <input
                type="text"
                placeholder="Add a task"
                value={value}
                className={styles.input}
                onChange={handleInputChange}
            />
            <button
                onClick={handleAddBtnClick}
                className={styles.button}
                disabled={value.length < 1}
            >
                Add
            </button>
        </div>
    );
};
