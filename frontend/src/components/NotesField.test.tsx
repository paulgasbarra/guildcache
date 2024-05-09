import React from "react";
import NotesField from "./NotesField";
import { render, screen, fireEvent } from "@testing-library/react";

describe("NotesField Component", () => {
  it("renders a textarea element", () => {
    render(<NotesField notes="" updateNote={vi.fn()} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders a label element", () => {
    render(<NotesField notes="" updateNote={vi.fn()} />);
    expect(screen.getByText("Notes:")).toBeInTheDocument();
  });

  it("renders the value of the notes prop", () => {
    render(<NotesField notes="Example Notes" updateNote={vi.fn()} />);
    expect(screen.getByRole("textbox")).toHaveValue("Example Notes");
  });

  //test that clicking "save notes" button calls the updateNote prop with the current note value
  it("calls the updateNote prop when the button is clicked", () => {
    const updateNote = vi.fn();
    render(<NotesField notes="" updateNote={updateNote} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "New Notes" },
    });
    fireEvent.click(screen.getByRole("button"));
    expect(updateNote).toHaveBeenCalledWith("New Notes");
  });
});
