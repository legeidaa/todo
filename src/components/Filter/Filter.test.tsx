import { FilterCategory, Task } from "@/model/interfaces";
import { render, fireEvent } from "@testing-library/react";
import { Filter } from "./Filter";

describe("Filter", () => {
    const tasks: Task[] = [
        { id: 1, value: "Task 1", completed: false },
        { id: 2, value: "Task 2", completed: true },
        { id: 3, value: "Task 3", completed: false },
    ];

    test("renders tasks left, filter options and clear completed button", () => {
        const { getByText } = render(
            <Filter
                tasks={tasks}
                activeRadio={FilterCategory.ALL}
                onFilterSwitch={() => {}}
                onClearCompletedClick={() => {}}
            />
        );
        expect(getByText("2 active left")).toBeInTheDocument();
        expect(getByText("All")).toBeInTheDocument();
        expect(getByText("Active")).toBeInTheDocument();
        expect(getByText("Completed")).toBeInTheDocument();
        expect(getByText("Clear completed")).toBeInTheDocument();
    });

    test("calls onFilterSwitch when filter option is changed", () => {
        const onFilterSwitch = jest.fn();
        const { getByRole } = render(
            <Filter
                tasks={tasks}
                activeRadio={FilterCategory.ALL}
                onFilterSwitch={onFilterSwitch}
                onClearCompletedClick={() => {}}
            />
        );
        const filterOption = getByRole("radio", { name: 'Active' });

        fireEvent.click(filterOption);
        expect(onFilterSwitch).toHaveBeenCalledTimes(1);
        expect(onFilterSwitch).toHaveBeenCalledWith(FilterCategory.ACTIVE);
    });

    test("calls onClearCompletedClick", () => {
        const onClearCompletedClick = jest.fn();
        const { getByText } = render(
            <Filter
                tasks={tasks}
                activeRadio={FilterCategory.ALL}
                onFilterSwitch={() => {}}
                onClearCompletedClick={onClearCompletedClick}
            />
        );
        const clearCompletedButton = getByText("Clear completed");
        fireEvent.click(clearCompletedButton);
        expect(onClearCompletedClick).toHaveBeenCalledTimes(1);
    });
});
