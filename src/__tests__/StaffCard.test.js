import React from "react";
import { render, screen } from "@testing-library/react";
import StaffCard from "../components/StaffCard";

describe("StaffCard component", () => {
  const basePerson = {
    name: "Jane Doe",
    role: "Developer",
    status: "active",
    email: "jane.doe@example.com",
    lastLogin: new Date("2025-05-01T12:34:56Z").toISOString(),
    driveUsage: "5 GB",
    device: "MacBook Pro",
  };

  it("renders name, role, status badge, and email link for non-admin", () => {
    render(<StaffCard person={basePerson} isAdmin={false} />);

    // name and role
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("Developer")).toBeInTheDocument();

    // status
    const statusBadge = screen.getByText(/active/i);
    expect(statusBadge).toBeInTheDocument();
    expect(statusBadge).toHaveClass("bg-green-100"); // tailwind class for active

    // email
    const emailLink = screen.getByRole("link", {
      name: /jane.doe@example.com/i,
    });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", "mailto:jane.doe@example.com");

    // admin-only fields should NOT be present
    expect(screen.queryByText(/Last Login:/i)).toBeNull();
    expect(screen.queryByText(/Drive Usage:/i)).toBeNull();
    expect(screen.queryByText(/Device:/i)).toBeNull();
  });

  it("renders admin-only info when isAdmin is true", () => {
    render(<StaffCard person={basePerson} isAdmin={true} />);

    // last Login
    expect(screen.getByText(/Last Login:/i)).toBeInTheDocument();
    const dateString = new Date(basePerson.lastLogin).toLocaleString();
    expect(screen.getByText(dateString)).toBeInTheDocument();

    // drive Usage
    expect(screen.getByText(/Drive Usage:/i)).toBeInTheDocument();
    expect(screen.getByText("5 GB")).toBeInTheDocument();

    // device
    expect(screen.getByText(/Device:/i)).toBeInTheDocument();
    expect(screen.getByText("MacBook Pro")).toBeInTheDocument();
  });
});
