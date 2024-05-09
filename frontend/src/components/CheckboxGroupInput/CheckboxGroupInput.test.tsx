// CheckboxGroupInput.test.tsx

import React from "react";
import CheckboxGroupInput from "./CheckboxGroupInput";
import { render, screen, fireEvent } from "@testing-library/react";

const exampleCheckboxGroupInput = (
  options: { value: string; label: string; selected: boolean }[]
) => (
  <CheckboxGroupInput
    error={[]}
    handleChange={vi.fn()}
    id={"test"}
    label={"Test"}
    options={options}
    value={[]}
  />
);

describe("CheckboxGroupInput Component", () => {
  it("renders a label for the group", () => {
    const options = [
      { value: "option1", label: "Option 1", selected: false },
      { value: "option2", label: "Option 2", selected: false },
      { value: "option3", label: "Option 3", selected: false },
    ];
    render(exampleCheckboxGroupInput(options));
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("renders a checkbox input for each option", () => {
    const options = [
      { value: "option1", label: "Option 1", selected: false },
      { value: "option2", label: "Option 2", selected: false },
      { value: "option3", label: "Option 3", selected: false },
    ];
    render(exampleCheckboxGroupInput(options));
    expect(screen.getAllByRole("checkbox")).toHaveLength(3);
  });

  it("renders a label element for each option", () => {
    const options = [
      { value: "option1", label: "Option 1", selected: false },
      { value: "option2", label: "Option 2", selected: false },
      { value: "option3", label: "Option 3", selected: false },
    ];
    render(exampleCheckboxGroupInput(options));
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  it("renders the value of the selectedOptions prop", () => {
    const options = [{ value: "option1", label: "Option 1", selected: true }];

    render(
      <CheckboxGroupInput
        error={[]}
        handleChange={vi.fn()}
        id={"test"}
        label={"Test"}
        options={options}
        value={[]}
      />
    );
    expect(screen.getAllByRole("checkbox")[0]).toBeChecked();
  });

  it("calls the setSelectedOptions prop when a checkbox is clicked", () => {
    const options = [{ value: "option1", label: "Option 1", selected: false }];
    const handleChange = vi.fn();
    render(
      <CheckboxGroupInput
        error={[]}
        handleChange={handleChange}
        id={"test"}
        label={"Test"}
        options={options}
        value={[]}
      />
    );
    fireEvent.click(screen.getAllByRole("checkbox")[0]);
    expect(handleChange).toHaveBeenCalled();
  });
});
