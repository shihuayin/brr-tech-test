import React from "react";
import { render, screen } from "@testing-library/react";
import ITRequest from "../pages/ITRequest";
import { AuthProvider } from "../context/AuthContext";
import { DataProvider } from "../context/DataContext";

describe("ITRequest page", () => {
  // clear sessionStorage after each test
  afterEach(() => {
    window.sessionStorage.clear();
  });

  it("redirects when not logged in (renders mock Navigate)", () => {
    // render the component under “not logged in” state
    render(
      <AuthProvider>
        <DataProvider>
          <ITRequest />
        </DataProvider>
      </AuthProvider>
    );

    expect(screen.getByText(/MockNavigate to/)).toBeInTheDocument();
    //  form title should not appear
    expect(
      screen.queryByRole("heading", { name: /Submit IT Request/i })
    ).toBeNull();
  });

  it("renders form fields and a disabled submit button when logged in", () => {
    // simulate “logged in” by setting a user object in sessionStorage
    window.sessionStorage.setItem(
      "app_user",
      JSON.stringify({ email: "test@brrmedia.co.uk", isAdmin: false })
    );

    render(
      <AuthProvider>
        <DataProvider>
          <ITRequest />
        </DataProvider>
      </AuthProvider>
    );

    //  heading should be visible
    expect(
      screen.getByRole("heading", { name: /Submit IT Request/i })
    ).toBeInTheDocument();

    //  issue selector should be rendered
    expect(screen.getByLabelText(/Issue Type/i)).toBeInTheDocument();
    // description should be rendered
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();

    // file input should be rendered
    expect(screen.getByLabelText(/File \(optional\)/i)).toBeInTheDocument();

    // submit button should be disabled initially
    expect(
      screen.getByRole("button", { name: /Submit Request/i })
    ).toBeDisabled();
  });
});
