import React from "react";
import { render, screen } from "@testing-library/react";
import TicketRow from "../components/TicketRow";
import { STATUS_CLASS, STATUS } from "../constants";

describe("TicketRow component", () => {
  const baseProps = {
    id: "123",
    issue: "Test Issue",
    description: "Some description",
    createdDate: new Date("2025-05-01T10:00:00Z"),
    userEmail: "user@example.com",
    userName: "Alice",
  };

  it("renders issue, description, date, and status for a normal user", () => {
    render(<TicketRow {...baseProps} status={STATUS.OPEN} isAdmin={false} />);

    // issue
    const heading = screen.getByRole("heading", { name: /Test Issue/i });
    expect(heading).toBeInTheDocument();

    // description text
    expect(screen.getByText("Some description")).toBeInTheDocument();

    // date
    expect(screen.getByText(/Created:/i)).toHaveTextContent("Created:");

    // status
    const badge = screen.getByRole("status", { name: /Status: Open/i });
    expect(badge).toHaveTextContent("Open");
    expect(badge).toHaveClass(STATUS_CLASS[STATUS.OPEN]);

    // submitted by section should NOT be present for non-admin
    expect(screen.queryByText(/Submitted by:/i)).toBeNull();
  });

  it('shows "Submitted by" when isAdmin is true', () => {
    render(
      <TicketRow {...baseProps} status={STATUS.RESOLVED} isAdmin={true} />
    );

    // submitted by should include userName and email link
    const submitted = screen.getByText(/Submitted by:/i);
    expect(submitted).toBeInTheDocument();
    expect(submitted).toHaveTextContent("Alice (");
    const emailLink = screen.getByRole("link", { name: /user@example.com/i });
    expect(emailLink).toHaveAttribute("href", "mailto:user@example.com");

    // status badge reflects RESOLVED styling
    const badge = screen.getByRole("status", { name: /Status: Resolved/i });
    expect(badge).toHaveClass(STATUS_CLASS[STATUS.RESOLVED]);
  });
});
