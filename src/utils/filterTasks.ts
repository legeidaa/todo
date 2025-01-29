import { FilterCategory, Task } from "@/model/interfaces";

export const filterTasks = (tasks: Task[], activeCategory: FilterCategory) => {
    return tasks.filter((task) => {
        switch (activeCategory) {
            case FilterCategory.ALL:
                return true;

            case FilterCategory.ACTIVE:
                return !task.completed;

            case FilterCategory.COMPLETED:
                return task.completed;
            default:
                throw new Error("Invalid category");
        }
    });
};
