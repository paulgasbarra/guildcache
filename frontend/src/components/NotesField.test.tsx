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
    expect(screen.getByText("Notes")).toBeInTheDocument();
  });

  it("renders the value of the notes prop", () => {
    render(<NotesField notes="" updateNote={vi.fn()} />);
    expect(screen.getByRole("textbox")).toHaveValue("Example Notes");
  });

  it("calls the onChange prop when the value changes", () => {
    const onChange = vi.fn();
    render(<NotesField notes="" updateNote={vi.fn()} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "New Notes" },
    });
    expect(onChange).toHaveBeenCalledWith("New Notes");
  });
});
