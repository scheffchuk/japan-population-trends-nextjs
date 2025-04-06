import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PrefecturesCheckbox from "@/features/prefectures/components/prefectures-checkbox";

// Create a global toggleExpandMock instance.
const toggleExpandMock = jest.fn();

// Mock the Zustand stores and hooks used in the component
jest.mock("@/stores/use-checked-prefectures-store", () => ({
  __esModule: true,
  default: jest.fn((selector) =>
    selector({
      checkedPrefCodes: new Set([1]),
      resetChecked: jest.fn(),
      togglePrefCode: jest.fn(),
      isChecked: jest.fn((prefCode: number) => false),
    }),
  ),
}));

jest.mock("@/stores/use-checkbox-expansion", () => ({
  __esModule: true,
  default: () => ({
    isExpanded: false,
    toggleExpand: toggleExpandMock,
  }),
}));

jest.mock("@/features/prefectures/hooks/use-get-prefectures", () => ({
  useGetPrefectures: () => ({
    data: {
      result: [
        { prefCode: 1, prefName: "Tokyo" },
        { prefCode: 2, prefName: "Osaka" },
      ],
    },
    isLoading: false,
    isError: false,
  }),
}));

// Stub sub-components
jest.mock(
  "@/features/prefectures/components/checkbox-skeleton",
  () =>
    ({ children, isLoading, isError, hasData }: any) => (
      <div data-testid="checkbox-skeleton">
        {isLoading && <span>Loading...</span>}
        {isError && <span>Error</span>}
        {children}
      </div>
    ),
);
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

describe("PrefecturesCheckbox", () => {
  beforeEach(() => {
    // Reset the mock calls between tests.
    toggleExpandMock.mockClear();
  });

  it("renders the component with the prefecture checkboxes and buttons", () => {
    render(<PrefecturesCheckbox />);

    // Verify elements are present.
    expect(screen.getByTestId("checkbox-skeleton")).toBeInTheDocument();
    expect(screen.getByText("都道府県")).toBeInTheDocument();
    expect(screen.getByText("Tokyo")).toBeInTheDocument();
    expect(screen.getByText("Osaka")).toBeInTheDocument();
    expect(document.getElementById("prefecture-1")).toBeInTheDocument();
    expect(document.getElementById("prefecture-2")).toBeInTheDocument();
    expect(screen.getByTestId("reset-button")).toBeInTheDocument();
    expect(screen.getByTestId("expansion-button")).toBeInTheDocument();
  });

  it("calls toggleExpand when the expansion button is clicked", () => {
    render(<PrefecturesCheckbox />);
    const expansionBtn = screen.getByTestId("expansion-button");
    fireEvent.click(expansionBtn);
    expect(toggleExpandMock).toHaveBeenCalled();
  });
});
