import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PrefecturesCheckboxClient from "@/features/prefectures/components/prefectures-checkbox";
import { Prefectures } from "@/types";

// Create a global toggleExpandMock instance.
const toggleExpandMock = jest.fn();
const resetCheckedMock = jest.fn();
const togglePrefCodeMock = jest.fn();
const isCheckedMock = jest.fn().mockReturnValue(false);

// Mock prefectures data
const mockPrefectures: Prefectures[] = [
  { prefCode: 1, prefName: "Tokyo" },
  { prefCode: 2, prefName: "Osaka" },
  { prefCode: 3, prefName: "Kyoto" },
  { prefCode: 4, prefName: "Hokkaido" },
];

// Mock the Zustand stores and hooks used in the component
jest.mock("@/stores/use-checked-prefectures-store", () => ({
  __esModule: true,
  default: jest.fn((selector) =>
    selector({
      checkedPrefCodes: new Set([1]),
      resetChecked: resetCheckedMock,
      togglePrefCode: togglePrefCodeMock,
      isChecked: isCheckedMock,
    }),
  ),
}));

// Mock with isExpanded=true to show all prefectures in the first test
let mockIsExpanded = true;

jest.mock("@/stores/use-checkbox-expansion", () => ({
  __esModule: true,
  default: () => ({
    isExpanded: mockIsExpanded,
    toggleExpand: toggleExpandMock,
  }),
}));

// Stub sub-components
jest.mock(
  "@/components/ui/expansion-button",
  () =>
    ({ isExpanded, toggleExpand }: any) => (
      <button data-testid="expansion-button" onClick={toggleExpand}>
        {isExpanded ? "Collapse" : "Expand"}
      </button>
    ),
);

jest.mock(
  "@/components/ui/reset-button",
  () =>
    ({ onReset, isDisabled }: any) => (
      <button
        data-testid="reset-button"
        disabled={isDisabled}
        onClick={onReset}
      >
        Reset
      </button>
    ),
);

describe("PrefecturesCheckboxClient", () => {
  beforeEach(() => {
    // Reset the mock calls between tests.
    toggleExpandMock.mockClear();
    resetCheckedMock.mockClear();
    togglePrefCodeMock.mockClear();
    isCheckedMock.mockClear();
    isCheckedMock.mockReturnValue(false);
    // Set isExpanded to true for most tests
    mockIsExpanded = true;
  });

  it("renders the component with the prefecture checkboxes and buttons", () => {
    render(<PrefecturesCheckboxClient prefectures={mockPrefectures} />);

    // Verify elements are present.
    expect(screen.getByText("都道府県")).toBeInTheDocument();
    expect(screen.getByText("Tokyo")).toBeInTheDocument();
    expect(screen.getByText("Osaka")).toBeInTheDocument();
    expect(document.getElementById("prefecture-1")).toBeInTheDocument();
    expect(document.getElementById("prefecture-2")).toBeInTheDocument();
    expect(screen.getByTestId("reset-button")).toBeInTheDocument();
    expect(screen.getByTestId("expansion-button")).toBeInTheDocument();
  });

  it("calls toggleExpand when the expansion button is clicked", () => {
    render(<PrefecturesCheckboxClient prefectures={mockPrefectures} />);
    const expansionBtn = screen.getByTestId("expansion-button");
    fireEvent.click(expansionBtn);
    expect(toggleExpandMock).toHaveBeenCalled();
  });

  it("calls togglePrefCode when a checkbox is clicked", () => {
    render(<PrefecturesCheckboxClient prefectures={mockPrefectures} />);
    const checkbox = document.getElementById("prefecture-1") as HTMLInputElement;
    fireEvent.click(checkbox);
    expect(togglePrefCodeMock).toHaveBeenCalledWith(1);
  });

  it("calls resetChecked when the reset button is clicked", () => {
    render(<PrefecturesCheckboxClient prefectures={mockPrefectures} />);
    const resetButton = screen.getByTestId("reset-button");
    fireEvent.click(resetButton);
    expect(resetCheckedMock).toHaveBeenCalled();
  });

  it("displays only half of the prefectures when not expanded", () => {
    // Set isExpanded to false for this test
    mockIsExpanded = false;

    // Create a larger mock data set
    const largeMockPrefectures = Array.from({ length: 10 }, (_, i) => ({
      prefCode: i + 1,
      prefName: `Prefecture ${i + 1}`,
    }));

    render(<PrefecturesCheckboxClient prefectures={largeMockPrefectures} />);

    // With isExpanded=false, it should show only half (5) of the prefectures
    expect(screen.getByText("Prefecture 1")).toBeInTheDocument();
    expect(screen.getByText("Prefecture 5")).toBeInTheDocument();
    expect(screen.queryByText("Prefecture 6")).not.toBeInTheDocument();
  });
});
