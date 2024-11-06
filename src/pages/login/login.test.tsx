import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./login";
import { MemoryRouter, Route, Routes } from "react-router-dom";

jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
  getAuth: jest.fn(),
}));

describe("Login Component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders login form with email and password inputs and login button", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("allows the user to type into email and password inputs", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/Email address/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@test.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("redirects to signup when 'Sign up' link is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<div>Signup Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const signUpLink = screen.getByText(/Sign up/i);
    fireEvent.click(signUpLink);

    expect(screen.getByText(/Signup Page/i)).toBeInTheDocument();
  });
});
