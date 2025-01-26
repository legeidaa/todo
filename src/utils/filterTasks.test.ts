import { filterTasks } from "./filterTasks";
import { Task } from "@/model/interfaces";
import { FilterCategory } from "@/model/interfaces";

describe("filterTasks function", () => {
    const tasks: Task[] = [
        { id: 1, value: "Task 1", completed: false },
        { id: 2, value: "Task 2", completed: true },
        { id: 3, value: "Task 3", completed: false },
    ];

    test("returns all tasks when filter category is ALL", () => {
        const filteredTasks = filterTasks(tasks, FilterCategory.ALL);
        expect(filteredTasks).toEqual(tasks);
    });

    test("returns active tasks when filter category is ACTIVE", () => {
        const filteredTasks = filterTasks(tasks, FilterCategory.ACTIVE);
        expect(filteredTasks).toEqual([
            { id: 1, value: "Task 1", completed: false },
            { id: 3, value: "Task 3", completed: false },
        ]);
    });

    test("returns completed tasks when filter category is COMPLETED", () => {
        const filteredTasks = filterTasks(tasks, FilterCategory.COMPLETED);
        expect(filteredTasks).toEqual([
            { id: 2, value: "Task 2", completed: true },
        ]);
    });

    test("returns empty array when tasks array is empty", () => {
        const filteredTasks = filterTasks([], FilterCategory.ALL);
        expect(filteredTasks).toEqual([]);
    });

    test("throws error when filter category is invalid", () => {
        expect(() => filterTasks(tasks, "invalid" as FilterCategory)).toThrow(
            "Invalid category"
        );
    });
});
