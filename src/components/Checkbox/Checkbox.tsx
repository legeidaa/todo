import styles from "./Checkbox.module.scss";
import { FC } from "react";

interface CheckboxProps {
    checked: boolean;
    onChange: () => void;
}

export const Checkbox: FC<CheckboxProps> = (props) => {
    const { onChange, checked } = props;

    return (
        <label className={styles.label}>
            <input
                className={styles.input}
                type="checkbox"
                onChange={onChange}
                checked={checked}
            />
            <span className={styles.checkmark}></span>
        </label>
    );
};
