import { prettyDOM, render, screen } from "@testing-library/react";
import App from "./App";

// Mock the Firebase function
jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
}));

test("render app", async () => {
  render(<App />);
  expect(screen.getByText(/CHART GENIE/)).toBeInTheDocument();
});
