import { ChangeEvent, FC } from "react";
import styles from "./Filter.module.css";
import { FilterCategory } from "@/model/interfaces";
import { isFilterCategory } from "@/utils/isFilterCategory";

interface FilterProps {
    // activeCount: number;
    onFilterSwitch: (category: FilterCategory) => void;
    activeRadio: FilterCategory;
}

export const Filter: FC<FilterProps> = (props) => {
    const {  onFilterSwitch, activeRadio } = props;

    const handleFilterSwitch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (isFilterCategory(value)) onFilterSwitch(value);
    };
    return (
        <div className={styles.filter}>
            {/* <div className={styles.left}>{activeCount} tasks left</div> */}
            <form className={styles.filterRadios}>
                <label>
                    <input
                        type="radio"
                        name="filter"
                        checked={activeRadio === "all"}
                        value={"all"}
                        onChange={handleFilterSwitch}
                    />
                    <span>All</span>
                </label>
                <label>
                    <input
                        type="radio"
                        name="filter"
                        checked={activeRadio === "active"}
                        value={"active"}
                        onChange={handleFilterSwitch}
                    />
                    <span>active</span>
                </label>
                <label>
                    <input
                        type="radio"
                        name="filter"
                        checked={activeRadio === "completed"}
                        value={"completed"}
                        onChange={handleFilterSwitch}
                    />
                    <span>completed</span>
                </label>
            </form>
            <button className={styles.clearBtn}>Clear completed</button>
        </div>
    );
};
