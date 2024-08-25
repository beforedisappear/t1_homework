import "@testing-library/jest-dom";
import { it, expect, describe, beforeEach } from "vitest";
import { Faq } from "./Faq";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { faqData } from "./faq.data";

describe("Faq", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Faq />
      </MemoryRouter>
    );
  });

  it("renders FAQ title", () => {
    const title = screen.getByRole("heading", { name: /faq/i });
    expect(title).toBeInTheDocument();
  });

  it("renders all FAQ items", () => {
    faqData.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.subtitle)).toBeInTheDocument();
    });
  });

  it("click on FAQ section and check visibility", () => {
    faqData.forEach((_, i) => {
      const button = screen.getByTestId(`faq_btn_${i}`);

      expect(button).toHaveAttribute("aria-expanded", "false");
      expect(button).toHaveAttribute("aria-label", "Open accordion section");

      fireEvent.click(button);
      expect(button).toHaveAttribute("aria-expanded", "true");
      expect(button).toHaveAttribute("aria-label", "Close accordion section");

      fireEvent.click(button);
      expect(button).toHaveAttribute("aria-expanded", "false");
      expect(button).toHaveAttribute("aria-label", "Open accordion section");
    });
  });
});
