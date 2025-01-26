import { render, fireEvent, waitFor } from "@testing-library/react";
import { AddTaskInput } from "./AddTaskInput";

describe("AddTaskInput", () => {
    test("renders input and button", () => {
        const { getByPlaceholderText, getByText } = render(
            <AddTaskInput onAddTask={() => {}} />
        );
        expect(getByPlaceholderText("Add a task")).toBeInTheDocument();
        expect(getByText("Add")).toBeInTheDocument();
    });
    test("calls onAddTask when button is clicked", async () => {
        const onAddTask = jest.fn();
        const { getByPlaceholderText, getByText } = render(
            <AddTaskInput onAddTask={onAddTask} />
        );
        const inputField = getByPlaceholderText("Add a task");
        const addButton = getByText("Add");

        fireEvent.change(inputField, { target: { value: "New task" } });
        fireEvent.click(addButton);

        expect(onAddTask).toHaveBeenCalledTimes(1);
        expect(onAddTask).toHaveBeenCalledWith("New task");
        await waitFor(() => expect(inputField).toHaveValue(""));
    });

    test('does not call onAddTask when input is empty', () => {
        const onAddTask = jest.fn();
        const { getByText } = render(<AddTaskInput onAddTask={onAddTask} />);
        const addButton = getByText('Add');
    
        fireEvent.click(addButton);
    
        expect(onAddTask).not.toHaveBeenCalled();
      });
});
