import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PopulationDataCard } from "@/components/population-data-card";
import { useAvailableCategories } from "@/hooks/use-available-categories";

// --- Mocks for all dependencies ---

// Mock the checked prefectures store
jest.mock("@/stores/use-checked-prefectures-store", () => ({
  __esModule: true,
  default: jest.fn((selector) =>
    selector({
      checkedPrefCodes: new Set([1, 2]),
      resetChecked: jest.fn(),
      togglePrefCode: jest.fn(),
      // isChecked is a function that returns false for any code
      isChecked: jest.fn(() => false),
    }),
  ),
}));

// Mock the population data queries hook
jest.mock("@/hooks/use-population-data-queries", () => ({
  usePopulationQueries: () => ({
    queries: [], // For our purposes, an empty array is fine since transformed hook is separately mocked.
    isLoading: false,
    errors: [],
  }),
}));

// Mock the available categories hook
jest.mock("@/hooks/use-available-categories", () => ({
  useAvailableCategories: jest.fn(() => ({
    availableCategories: ["Total", "Youth"],
    selectedCategory: "Total",
    setSelectedCategory: jest.fn(),
  })),
}));

// Mock the transformed population data hook
jest.mock("@/hooks/use-transformed-population-data", () => ({
  useTransformedPopulationData: () => [
    { year: 2000, 1: 1000, 2: 500 },
    { year: 2005, 1: 1100, 2: 550 },
  ],
}));

// Mock the get prefectures hook
jest.mock("@/hooks/use-get-prefectures", () => ({
  useGetPrefectures: () => ({
    nameMapping: { 1: "Tokyo", 2: "Osaka" },
  }),
}));

// Stub the PopulationLineChart component so we can detect it
jest.mock("@/components/population-line-chart", () => () => (
  <div data-testid="population-line-chart">PopulationLineChart</div>
));

// Stub the CardSkeleton component to render its children
jest.mock("@/components/ui/card-skeleton", () => ({
  CardSkeleton: ({ children, isLoading, errors, hasData }: any) => (
    <div data-testid="card-skeleton">
      {isLoading && <span>Loading...</span>}
      {errors && errors.length > 0 && <span>Error</span>}
      {children}
    </div>
  ),
}));

// --- Test Suite ---
describe("PopulationDataCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the card with select and chart", () => {
    render(<PopulationDataCard />);

    // Verify that the CardSkeleton is rendered.
    expect(screen.getByTestId("card-skeleton")).toBeInTheDocument();

    // The select element should be rendered with id "category-select".
    const select = document.getElementById("category-select");
    expect(select).toBeInTheDocument();

    // Check that the available options exist.
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("Youth")).toBeInTheDocument();

    // Since our transformed hook returns chart data, the PopulationLineChart should render.
    expect(screen.getByTestId("population-line-chart")).toBeInTheDocument();
  });

  it("calls setSelectedCategory when the select value changes", () => {
    // Override the available categories hook for this test to capture setSelectedCategory.
    const mockSetSelectedCategory = jest.fn();
    // Access the mocked hook and override its return value.
    (useAvailableCategories as jest.Mock).mockReturnValue({
      availableCategories: ["Total", "Youth"],
      selectedCategory: "Total",
      setSelectedCategory: mockSetSelectedCategory,
    });

    render(<PopulationDataCard />);

    // Get the select element
    const select = document.getElementById(
      "category-select",
    ) as HTMLSelectElement;
    expect(select).toBeInTheDocument();

    // Simulate changing the value to "Youth"
    fireEvent.change(select, { target: { value: "Youth" } });
    expect(mockSetSelectedCategory).toHaveBeenCalledWith("Youth");
  });
});
