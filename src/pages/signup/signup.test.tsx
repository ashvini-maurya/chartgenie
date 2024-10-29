import { render, screen, fireEvent } from "@testing-library/react";
import Signup from "./signup";
import { MemoryRouter, Route, Routes } from "react-router-dom";

jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
  getAuth: jest.fn(),
}));

describe("Signup Component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders signup form with email and password inputs and login button", () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
  });

  it("allows the user to type into email and password inputs", () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/Email address/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@test.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("redirects to login when 'Login' link is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </MemoryRouter>
    );

    const loginLink = screen.getByText(/Sign in/i);
    fireEvent.click(loginLink);

    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
  });
});
