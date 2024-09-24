import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Register from "./Register";

describe("Register Component", () => {
  test("renders the Register component", () => {
    render(<Register />);
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  test("shows validation errors when fields are touched and invalid", () => {
    render(<Register />);

    // First Name field
    const firstNameInput = screen.getByLabelText("First Name:");
    fireEvent.change(firstNameInput, { target: { value: "a" } });
    expect(
      screen.getByText(
        "First name must be at least 3 characters long and contain no numbers."
      )
    ).toBeInTheDocument();

    // Last Name field
    const lastNameInput = screen.getByLabelText("Last Name:");
    fireEvent.change(lastNameInput, { target: { value: "b" } });
    expect(
      screen.getByText(
        "Last name must be at least 3 characters long and contain no numbers."
      )
    ).toBeInTheDocument();

    // Email field
    const emailInput = screen.getByLabelText("Email:");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    expect(
      screen.getByText("Please enter a valid email address.")
    ).toBeInTheDocument();

    // Password field
    const passwordInput = screen.getByLabelText("Password:");
    fireEvent.change(passwordInput, { target: { value: "123" } });
    expect(
      screen.getByText("Password must be at least 6 characters long.")
    ).toBeInTheDocument();

    // Confirm Password field
    const confirmPasswordInput = screen.getByLabelText("Confirm Password:");
    fireEvent.change(confirmPasswordInput, { target: { value: "1234" } });
    expect(screen.getByText("Passwords do not match.")).toBeInTheDocument();
  });

  test("hides validation errors when fields are valid", () => {
    render(<Register />);

    // First Name field
    const firstNameInput = screen.getByLabelText("First Name:");
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    expect(
      screen.queryByText(
        "First name must be at least 3 characters long and contain no numbers."
      )
    ).not.toBeInTheDocument();

    // Last Name field
    const lastNameInput = screen.getByLabelText("Last Name:");
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    expect(
      screen.queryByText(
        "Last name must be at least 3 characters long and contain no numbers."
      )
    ).not.toBeInTheDocument();

    // Email field
    const emailInput = screen.getByLabelText("Email:");
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    expect(
      screen.queryByText("Please enter a valid email address.")
    ).not.toBeInTheDocument();

    // Password field
    const passwordInput = screen.getByLabelText("Password:");
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(
      screen.queryByText("Password must be at least 6 characters long.")
    ).not.toBeInTheDocument();

    // Confirm Password field
    const confirmPasswordInput = screen.getByLabelText("Confirm Password:");
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });
    expect(
      screen.queryByText("Passwords do not match.")
    ).not.toBeInTheDocument();
  });

  test("disables the submit button when there are validation errors", () => {
    render(<Register />);

    const submitButton = screen.getByText("Register");
    expect(submitButton).toBeDisabled();

    // Fill in valid values
    fireEvent.change(screen.getByLabelText("First Name:"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last Name:"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password:"), {
      target: { value: "password123" },
    });

    expect(submitButton).not.toBeDisabled();
  });

  test("submits the form when all fields are valid", () => {
    render(<Register />);

    // Fill in valid values
    fireEvent.change(screen.getByLabelText("First Name:"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last Name:"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password:"), {
      target: { value: "password123" },
    });

    const submitButton = screen.getByText("Register");
    fireEvent.click(submitButton);

    // Check if form submission logic is called
    // This can be done by mocking the form submission handler
    // For simplicity, we just check if the console.log is called
    expect(console.log).toHaveBeenCalledWith("Form submitted:", {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      confirmPassword: "password123",
    });
  });
});
