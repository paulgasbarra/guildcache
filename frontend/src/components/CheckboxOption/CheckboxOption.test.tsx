import React from "react";
import CheckboxOption from "./CheckboxOption";
import { render, screen, fireEvent } from "@testing-library/react";

const option = { value: "example", label: "Example Option", selected: false };

describe("CheckboxOption Component", () => {
  it("renders a checkbox input", () => {
    render(
      <CheckboxOption option={option} checked={false} onChange={vi.fn()} />
    );
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("renders a label element", () => {
    render(
      <CheckboxOption option={option} checked={false} onChange={vi.fn()} />
    );
    expect(screen.getByText("Example Option")).toBeInTheDocument();
  });

  it("renders the value of the checked prop", () => {
    render(
      <CheckboxOption option={option} checked={true} onChange={vi.fn()} />
    );
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("calls the onChange prop when the checkbox is clicked", () => {
    const onChange = vi.fn();
    render(
      <CheckboxOption option={option} checked={false} onChange={onChange} />
    );
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalled();
  });
});
