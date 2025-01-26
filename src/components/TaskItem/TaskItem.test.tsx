import { render, fireEvent } from "@testing-library/react";
import { TaskItem } from "./TaskItem";
import { Task } from "@/model/interfaces";

describe("TaskItem ", () => {
    const task: Task = {
        id: 1,
        value: "Task 1",
        completed: false,
    };

    test("renders task", () => {
        const { getByText, getByRole } = render(
            <TaskItem
                taskData={task}
                onCheckboxChange={() => {}}
                onDeleteTask={() => {}}
                onEdit={() => {}}
            />
        );
        expect(getByText(task.value)).toBeInTheDocument();
        expect(getByRole("checkbox")).toBeInTheDocument();
    });

    test("renders completed task", () => {
        const completedTask: Task = {
            id: 1,
            value: "Task 1",
            completed: true,
        };
        const { getByTestId } = render(
            <TaskItem
                taskData={completedTask}
                onCheckboxChange={() => {}}
                onDeleteTask={() => {}}
                onEdit={() => {}}
            />
        );
        expect(getByTestId("task-value").getAttribute("class")).toContain(
            "completed"
        );
    });

    test("calls onCheckboxChange when checkbox is clicked", async () => {
        const onCheckboxChange = jest.fn();
        const { getByRole } = render(
            <TaskItem
                onCheckboxChange={onCheckboxChange}
                onDeleteTask={() => {}}
                onEdit={() => {}}
                taskData={task}
            />
        );
        const checkbox = getByRole("checkbox");
        fireEvent.click(checkbox);
        expect(onCheckboxChange).toHaveBeenCalledTimes(1);
    });

    test("calls onDeleteTask when delete button is clicked", () => {
        const onDeleteTask = jest.fn();
        const { getByTestId } = render(
            <TaskItem
                taskData={task}
                onCheckboxChange={() => {}}
                onDeleteTask={onDeleteTask}
                onEdit={() => {}}
            />
        );
        const deleteButton = getByTestId("task-delete");
        fireEvent.click(deleteButton);
        expect(onDeleteTask).toHaveBeenCalledTimes(1);
    });

    test("calls onEdit and change task value", () => {
        const onEdit = jest.fn();
        const { getByTestId, getByText } = render(
            <TaskItem
                taskData={task}
                onCheckboxChange={() => {}}
                onDeleteTask={() => {}}
                onEdit={onEdit}
            />
        );
        const editButton = getByTestId("task-edit");
        fireEvent.click(editButton);
        const taskValue = getByText(task.value);
        fireEvent.input(taskValue, {
            target: { textContent: "New task value" },
        });
        expect(onEdit).toHaveBeenCalledTimes(1);
        expect(onEdit).toHaveBeenCalledWith(task.id, "New task value");
    });
});
