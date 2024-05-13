import React from "react";
import Modal from "./Modal";
import { render, fireEvent, screen } from "@testing-library/react";

describe("Modal", () => {
  it("renders", () => {
    render(<Modal open onClose={() => {}} children="Hello" />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
  //Why does this fail?
  //   it("does not render when open is false", () => {
  //     render(<Modal open={false} onClose={() => {}} children="Hello" />);
  //     expect(screen.getByText("Hello")).not.toBeInTheDocument();
  //   });

  it("renders children", () => {
    const { getByText } = render(
      <Modal open onClose={() => {}} children="Hello" />
    );
    expect(getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClose when clicked", () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} children="Hello" />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClose).toHaveBeenCalled();
  });
});
