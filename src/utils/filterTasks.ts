import { FilterCategory, Task } from "@/model/interfaces";

export const filterTasks = (tasks: Task[], activeCategory: FilterCategory) => {
    return tasks.filter((task) => {
        if (activeCategory === "all") {
            return true;
        } else if (activeCategory === "active") {
            return !task.completed;
        } else if (activeCategory === "completed") {
            return task.completed;
        } else {
            throw new Error("Invalid category");
        }
    });
};
