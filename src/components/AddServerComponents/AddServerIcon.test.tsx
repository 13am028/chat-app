import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import AddServerIcon from "./AddServerIcon";

describe("AddServerIcon", () => {
    it("should render the component correctly", () => {
        const onGroupCreateMock = jest.fn();
        render(<AddServerIcon onGroupCreate={onGroupCreateMock} />);
        const addButton = screen.getByTestId("add-server-icon-button");
        expect(addButton).toBeInTheDocument();
    });

    it("should open the modal on button click", () => {
        const onGroupCreateMock = jest.fn();
        render(<AddServerIcon onGroupCreate={onGroupCreateMock} />);
        const addButton = screen.getByTestId("add-server-icon-button");
        expect(addButton).toBeInTheDocument();

        act(() => {
            fireEvent.click(addButton);
        });

        const modal = screen.getByTestId("add-server-modal");
        expect(modal).toBeInTheDocument();
    });

    it("should close the modal on close button click", async () => {
        const onGroupCreateMock = jest.fn();
        render(<AddServerIcon onGroupCreate={onGroupCreateMock} />);
        const addButton = screen.getByTestId("add-server-icon-button");
        expect(addButton).toBeInTheDocument();

        act(() => {
            fireEvent.click(addButton);
        });

        const modal = screen.getByTestId("add-server-modal");
        expect(modal).toBeInTheDocument();

        const closeButton = screen.getByTestId("add-server-modal-close-button");

        act(() => {
            fireEvent.click(closeButton);
        });

        await waitFor(() => expect(modal).not.toBeInTheDocument());
    });

    it("should call onGroupCreate prop and close the modal on successful group creation", async () => {
        const onGroupCreateMock = jest.fn();
        render(<AddServerIcon onGroupCreate={onGroupCreateMock} />);
        const addButton = screen.getByTestId("add-server-icon-button");
        expect(addButton).toBeInTheDocument();

        act(() => {
            fireEvent.click(addButton);
        });

        const modal = screen.getByTestId("add-server-modal");
        expect(modal).toBeInTheDocument();

        const groupNameInput = screen.getByTestId("add-server-modal-input");
        const createButton = screen.getByTestId("add-server-modal-create-button");

        act(() => {
            fireEvent.change(groupNameInput, { target: { value: "test-group-name" } });
            fireEvent.click(createButton);
        });

        await waitFor(() => expect(modal).not.toBeInTheDocument());
        expect(onGroupCreateMock).toHaveBeenCalled();
    });
});
