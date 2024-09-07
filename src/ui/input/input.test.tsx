import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { Input } from "./Input";
import { useForm, FormProvider } from "react-hook-form";
import { fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";

const TestForm = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(() => {})}>
        <Input
          name="testInput"
          rules={{ required: "This field is required" }}
          className="custom-class"
        />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

describe("Input", () => {
  it("should render input element", () => {
    render(<TestForm />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should apply provided className", () => {
    render(<TestForm />);
    expect(screen.getByRole("textbox")).toHaveClass("custom-class");
  });

  it("should register the input with react-hook-form", () => {
    render(<TestForm />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "test value" } });

    expect(input).toHaveValue("test value");
  });

  it("should not display error class when field is valid", async () => {
    render(<TestForm />);

    const input = screen.getByRole("textbox");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(input, { target: { value: "valid value" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(input).not.toHaveClass("invalid");
    });
  });

  it("should display error class when field has error", async () => {
    render(<TestForm />);

    const input = screen.getByRole("textbox");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.blur(input);

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(input).toHaveClass("invalid");
    });
  });
});
