import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../src/App";

describe("Focus Board", () => {
  test("adds a task and clears the input", () => {
    render(<App />);
    const input = screen.getByLabelText("Add a task");
    const deadline = screen.getByLabelText("Deadline");

    fireEvent.change(input, { target: { value: "Prepare demo" } });
    fireEvent.change(deadline, { target: { value: "2026-11-10" } });
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    expect(screen.getByText("Prepare demo")).toBeTruthy();
    expect(screen.getByText("Due 2026-11-10")).toBeTruthy();
    expect(input.value).toBe("");
    expect(deadline.value).toBe("");
  });

  test("filters tasks by completion status", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Active" }));

    expect(screen.queryByText("Review the project brief")).toBeNull();
    expect(screen.getByText("Sketch the first version")).toBeTruthy();
  });
});
