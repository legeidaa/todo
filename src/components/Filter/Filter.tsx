import { ChangeEvent, FC, useMemo } from "react";
import styles from "./Filter.module.scss";
import { FilterCategory, Task } from "@/model/interfaces";
import { isFilterCategory } from "@/utils/isFilterCategory";

interface FilterProps {
    tasks: Task[];
    onFilterSwitch: (category: FilterCategory) => void;
    activeRadio: FilterCategory;
    onClearCompletedClick: () => void;
}

export const Filter: FC<FilterProps> = (props) => {
    const { tasks, onFilterSwitch, activeRadio, onClearCompletedClick } = props;
    const activeCount = useMemo(
        () => tasks.filter((task) => !task.completed).length,
        [tasks]
    );

    const handleFilterSwitch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (isFilterCategory(value)) onFilterSwitch(value);
    };

    const handleClearCompletedClick = () => {
        onClearCompletedClick();
    };

    return (
        <div className={styles.filter}>
            <div className={styles.left}>{activeCount} active left</div>
            <form className={styles.filterRadios}>
                <label className={styles.filterLabel}>
                    <input
                        type="radio"
                        name="filter"
                        checked={activeRadio === FilterCategory.ALL}
                        value={FilterCategory.ALL}
                        onChange={handleFilterSwitch}
                        className={styles.filterInput}

                    />
                    <span className={styles.filterSpan}>All</span>
                </label>
                <label className={styles.filterLabel} >
                    <input
                        type="radio"
                        name="filter"
                        checked={activeRadio === FilterCategory.ACTIVE}
                        value={FilterCategory.ACTIVE}
                        onChange={handleFilterSwitch}
                        className={styles.filterInput}
                    />
                    <span className={styles.filterSpan}>Active</span>
                </label>
                <label className={styles.filterLabel} >
                    <input
                        type="radio"
                        name="filter"
                        checked={activeRadio === FilterCategory.COMPLETED}
                        value={FilterCategory.COMPLETED}
                        onChange={handleFilterSwitch}
                        className={styles.filterInput}

                    />
                    <span className={styles.filterSpan}>Completed</span>
                </label>
            </form>
            <button
                className={styles.clearBtn}
                onClick={handleClearCompletedClick}
            >
                Clear completed
            </button>
        </div>
    );
};
