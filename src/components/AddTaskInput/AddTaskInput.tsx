import styles from "./AddTaskInput.module.css";
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
        setValue('');
    };

    return (
        <div className={styles.wrapper}>
            <input type="text" value={value} onChange={handleInputChange} />
            {value.length > 0 && <button onClick={handleAddBtnClick}>Add</button>}
        </div>
    );
};
