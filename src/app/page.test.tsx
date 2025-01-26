import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Home from "./page";
import { defaultTasks } from "@/utils/defaultTasks";

describe("Home component", () => {
    test("renders app", () => {
        const { getAllByTestId, getByText, getByPlaceholderText } = render(
            <Home />
        );
        const valuesArr = getAllByTestId("task-value").map(
            (task) => task.textContent
        );
        const defaultValues = defaultTasks.map((task) => task.value);

        expect(valuesArr).toEqual(defaultValues);
        expect(getByText("TODO")).toBeInTheDocument();
        expect(getByPlaceholderText("Add a task")).toBeInTheDocument();
        expect(getByText("Clear completed")).toBeInTheDocument();
    });

    test("adds new task", async () => {
        const { getByPlaceholderText, getByText } = render(<Home />);
        const inputField = getByPlaceholderText("Add a task");
        const addButton = getByText("Add");
        fireEvent.change(inputField, { target: { value: "New task" } });
        fireEvent.click(addButton);
        await waitFor(() => expect(getByText("New task")).toBeInTheDocument());
    });

    test("deletes task ", async () => {
        const { getByText, queryByText, getAllByTestId, getByPlaceholderText } =
            render(<Home />);
        const inputField = getByPlaceholderText("Add a task");
        const addButton = getByText("Add");

        fireEvent.change(inputField, { target: { value: "New task" } });
        fireEvent.click(addButton);

        await waitFor(() => expect(getByText("New task")).toBeInTheDocument());

        const deleteButtons = getAllByTestId("task-delete");
        const deleteButton = deleteButtons[deleteButtons.length - 1];
        fireEvent.click(deleteButton);
        await waitFor(() => {
            expect(queryByText("New task")).not.toBeInTheDocument();
        });
    });

    test("edits task", async () => {
        const { getByText, getByPlaceholderText, getAllByTestId } = render(
            <Home />
        );
        const inputField = getByPlaceholderText("Add a task");
        const addButton = getByText("Add");
        fireEvent.change(inputField, { target: { value: "New task" } });
        fireEvent.click(addButton);

        const editButtons = getAllByTestId("task-edit");
        const editButton = editButtons[editButtons.length - 1];
        fireEvent.click(editButton);

        const taskValue = getByText("New task");
        fireEvent.input(taskValue, { target: { textContent: "Edited task" } });
        await waitFor(() =>
            expect(getByText("Edited task")).toBeInTheDocument()
        );
    });

    test("clears completed tasks", async () => {
        const { getByText, getByPlaceholderText, getAllByTestId, queryByText } =
            render(<Home />);
        const inputField = getByPlaceholderText("Add a task");
        const addButton = getByText("Add");
        fireEvent.change(inputField, { target: { value: "New task" } });
        fireEvent.click(addButton);

        const checkboxes = getAllByTestId("checkbox");
        const checkbox = checkboxes[checkboxes.length - 1];
        fireEvent.click(checkbox);
        const clearCompletedButton = getByText("Clear completed");
        fireEvent.click(clearCompletedButton);
        await waitFor(() =>
            expect(queryByText("New task")).not.toBeInTheDocument()
        );
    });
});
