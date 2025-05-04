import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "../components/Card";

describe("Card component", () => {
  // test case one: rendering title, actions, and children when props are provided
  it("renders title, actions, and children when provided", () => {
    // render with title,  action button, and child
    render(
      <Card title="Test Title" actions={<button>Action</button>}>
        <p>Child content</p>
      </Card>
    );

    const heading = screen.getByRole("heading", { name: /Test Title/i });
    expect(heading).toBeInTheDocument();

    const article = screen.getByRole("article");
    expect(article).toHaveAttribute("aria-labelledby", heading.id);
    expect(screen.getByText("Child content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Action/i })).toBeInTheDocument();
  });

  // test case two: rendering only children when title prop is absent
  it("renders only children when title prop is absent", () => {
    render(
      <Card>
        <span>No title here</span>
      </Card>
    );

    expect(screen.queryByRole("heading")).toBeNull();
    expect(screen.getByText("No title here")).toBeInTheDocument();
  });
});
