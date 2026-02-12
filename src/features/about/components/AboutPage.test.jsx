import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AboutPage from "./AboutPage";

// Mock SEOHead since it's a shared component that might interfere with unit tests
vi.mock("../../../shared/components/SEOHead", () => ({
  default: () => <div data-testid="seo-head" />,
}));

// Mock useAboutData (hypothetical hook for CMS data, or we mock the component structure)
// For now, we expect the component to receive/fetch data from 'content/about.md'
// If AboutPage fetches data inside, we would mock that fetch or the hook.
// Since the implementation isn't done, we'll assume the component will eventually
// render content based on the user stories.

describe("AboutPage", () => {
  describe("Happy Path", () => {
    it("should render the static title image with correct src", () => {
      render(<AboutPage />);
      const titleImage = screen.getByAltText(
        /¿Quién está detrás de la Cámara?/i,
      );
      expect(titleImage).toBeDefined();
      expect(titleImage.getAttribute("src")).toContain("signatureImg.svg");
    });

    it("should render the CMS content (description text)", () => {
      // Assuming 'Soy Leilen' is part of the placeholder or will be injected
      render(<AboutPage />);
      const descriptionText = screen.getByText(/Soy Leilen/i);
      expect(descriptionText).toBeDefined();
    });

    it("should justify the description text and use the correct font variable", () => {
      render(<AboutPage />);
      const descriptionContainer = screen
        .getByText(/Soy Leilen/i)
        .closest("div");
      // We'll look for the class or style that applies justified text and font
      // These tests will fail initially.
      expect(descriptionContainer.className).toContain("text-justify");
      expect(descriptionContainer.style.fontFamily).toContain(
        "var(--font-benton-modern-display)",
      );
    });

    it("should render the profile image from CMS", () => {
      render(<AboutPage />);
      // Checking for a profile image placeholder or actual img tag
      const profileImg = screen.getByRole("img", { name: /Leilen Mateo/i });
      expect(profileImg).toBeDefined();
      expect(profileImg).toHaveStyle({ height: "75vh" });
    });
  });

  describe("Layout & Responsiveness", () => {
    it("should have a two-column grid structure on desktop", () => {
      const { container } = render(<AboutPage />);
      const gridContainer = container.querySelector(".grid");
      expect(gridContainer).toBeDefined();
      expect(gridContainer.className).toContain("md:grid-cols-2");
    });
  });
});
