import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders product dashboard heading", () => {
  render(<App />);
  const heading = screen.getByText(/product dashboard/i);
  expect(heading).toBeInTheDocument();
});
