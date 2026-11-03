import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../src/App";

describe("Focus Board", () => {
  test("adds a task and clears the input", () => {
    render(<App />);
    const input = screen.getByLabelText("Add a task");

    fireEvent.change(input, { target: { value: "Prepare demo" } });
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    expect(screen.getByText("Prepare demo")).toBeTruthy();
    expect(input.value).toBe("");
  });

  test("filters tasks by completion status", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Active" }));

    expect(screen.queryByText("Review the project brief")).toBeNull();
    expect(screen.getByText("Sketch the first version")).toBeTruthy();
  });
});
