import "@testing-library/jest-dom";
import { it, expect, describe } from "vitest";
import { Button } from "./Button";
import { render, screen } from "@testing-library/react";

describe("Button", () => {
  it("renders as primary", () => {
    render(<Button variant="primary">Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("primary_btn");
  });

  it("renders with additional cssClass", () => {
    render(
      <Button variant="primary" className="extra-class">
        Click Me
      </Button>
    );

    const button = screen.getByRole("button", { name: /click me/i });

    expect(button).toHaveClass("primary_btn");
    expect(button).toHaveClass("extra-class");
  });

  it("renders children", () => {
    render(<Button variant="primary">Test Button</Button>);

    const button = screen.getByRole("button", { name: /test button/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Test Button");
  });
});
