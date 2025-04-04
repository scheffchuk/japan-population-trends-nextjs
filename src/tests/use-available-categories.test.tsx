import { renderHook, act } from "@testing-library/react";
import { UseQueryResult } from "@tanstack/react-query";
import {
  PopulationCategoryData,
  PopulationCompositionPerYearResponse,
  PopulationYearData,
} from "@/types";
import { useAvailableCategories } from "@/hooks/use-available-categories";

// Helper type for mock queries
type MockUseQueryResult = Partial<
  UseQueryResult<PopulationCompositionPerYearResponse, Error>
>;

const mockPopulationData: PopulationYearData[] = [];

const createSuccessQuery = (
  categories: PopulationCategoryData[],
): MockUseQueryResult => ({
  isSuccess: true,
  isLoading: false,
  isError: false,
  data: {
    message: null,
    result: {
      boundaryYear: 2020,
      data: categories,
    },
  },
});

// Helper function to create mock loading query results
const createLoadingQuery = (): MockUseQueryResult => ({
  isSuccess: false,
  isLoading: true,
  isError: false,
  data: undefined,
});

// Helper function to create mock error query results
const createErrorQuery = (): MockUseQueryResult => ({
  isSuccess: false,
  isLoading: false,
  isError: true,
  error: new Error("Failed to fetch"),
  data: undefined,
});

describe("useAvailableCategories", () => {
  it("should initialize with no categories and null selection when queries are loading", () => {
    const mockQueries = [
      createLoadingQuery(),
      createLoadingQuery(),
    ] as UseQueryResult<PopulationCompositionPerYearResponse, Error>[];

    const { result } = renderHook(() => useAvailableCategories(mockQueries));

    expect(result.current.availableCategories).toEqual([]);
    expect(result.current.selectedCategory).toBeNull();
  });

  it("should initialize with no categories and null selection when queries fail", () => {
    const mockQueries = [
      createErrorQuery(),
      createErrorQuery(),
    ] as UseQueryResult<PopulationCompositionPerYearResponse, Error>[];

    const { result } = renderHook(() => useAvailableCategories(mockQueries));

    expect(result.current.availableCategories).toEqual([]);
    expect(result.current.selectedCategory).toBeNull();
  });

  it("should populate categories and select the first one when a query succeeds", () => {
    const mockCategories: PopulationCategoryData[] = [
      { label: "Total", data: mockPopulationData },
      { label: "Youth", data: mockPopulationData },
    ];
    const mockQueries = [
      createSuccessQuery(mockCategories), // Pass the full structure
    ] as UseQueryResult<PopulationCompositionPerYearResponse, Error>[];

    const { result } = renderHook(() => useAvailableCategories(mockQueries));

    expect(result.current.availableCategories).toEqual(["Total", "Youth"]);
    expect(result.current.selectedCategory).toBe("Total");
  });

  it("should use the first successful query if multiple queries are provided", () => {
    const mockCategories1: PopulationCategoryData[] = [
      { label: "Category A", data: mockPopulationData },
    ];
    const mockCategories2: PopulationCategoryData[] = [
      { label: "Category B", data: mockPopulationData },
    ];
    const mockQueries = [
      createLoadingQuery(),
      createSuccessQuery(mockCategories1),
      createSuccessQuery(mockCategories2),
    ] as UseQueryResult<PopulationCompositionPerYearResponse, Error>[];

    const { result } = renderHook(() => useAvailableCategories(mockQueries));

    expect(result.current.availableCategories).toEqual(["Category A"]);
    expect(result.current.selectedCategory).toBe("Category A");
  });

  it("should allow manually selecting an available category", () => {
    const mockCategories: PopulationCategoryData[] = [
      { label: "Total", data: mockPopulationData },
      { label: "Youth", data: mockPopulationData },
    ];
    const mockQueries = [createSuccessQuery(mockCategories)] as UseQueryResult<
      PopulationCompositionPerYearResponse,
      Error
    >[];

    const { result } = renderHook(() => useAvailableCategories(mockQueries));

    expect(result.current.selectedCategory).toBe("Total");

    act(() => {
      result.current.setSelectedCategory("Youth");
    });

    expect(result.current.selectedCategory).toBe("Youth");
    expect(result.current.availableCategories).toEqual(["Total", "Youth"]);
  });

  it("should reset selection to the first available category if the selected one becomes unavailable", () => {
    const initialCategories: PopulationCategoryData[] = [
      { label: "Total", data: mockPopulationData },
      { label: "Youth", data: mockPopulationData },
    ];
    const initialQueries = [
      createSuccessQuery(initialCategories),
    ] as UseQueryResult<PopulationCompositionPerYearResponse, Error>[];

    const { result, rerender } = renderHook(
      ({ queries }) => useAvailableCategories(queries),
      { initialProps: { queries: initialQueries } },
    );

    act(() => {
      result.current.setSelectedCategory("Youth");
    });
    expect(result.current.selectedCategory).toBe("Youth");

    const updatedCategories: PopulationCategoryData[] = [
      { label: "Total", data: mockPopulationData },
      { label: "Elderly", data: mockPopulationData },
    ];
    const updatedQueries = [
      createSuccessQuery(updatedCategories),
    ] as UseQueryResult<PopulationCompositionPerYearResponse, Error>[];
    rerender({ queries: updatedQueries });

    expect(result.current.availableCategories).toEqual(["Total", "Elderly"]);
    expect(result.current.selectedCategory).toBe("Total");
  });

  it("should set selection to null if all categories become unavailable", () => {
    const initialCategories: PopulationCategoryData[] = [
      { label: "Total", data: mockPopulationData },
    ];
    const initialQueries = [
      createSuccessQuery(initialCategories),
    ] as UseQueryResult<PopulationCompositionPerYearResponse, Error>[];

    const { result, rerender } = renderHook(
      ({ queries }) => useAvailableCategories(queries),
      { initialProps: { queries: initialQueries } },
    );

    expect(result.current.selectedCategory).toBe("Total");

    const updatedQueries = [createLoadingQuery()] as UseQueryResult<
      PopulationCompositionPerYearResponse,
      Error
    >[];
    rerender({ queries: updatedQueries });

    expect(result.current.availableCategories).toEqual([]);
    expect(result.current.selectedCategory).toBeNull();
  });

  it("should handle updates where the first successful query changes", () => {
    const initialQueries = [
      createLoadingQuery(),
      createSuccessQuery([{ label: "Initial", data: mockPopulationData }]),
    ] as UseQueryResult<PopulationCompositionPerYearResponse, Error>[];

    const { result, rerender } = renderHook(
      ({ queries }) => useAvailableCategories(queries),
      { initialProps: { queries: initialQueries } },
    );

    expect(result.current.availableCategories).toEqual(["Initial"]);
    expect(result.current.selectedCategory).toBe("Initial");

    const updatedQueries = [
      createSuccessQuery([
        { label: "Updated First", data: mockPopulationData },
      ]),
      createSuccessQuery([{ label: "Initial", data: mockPopulationData }]),
    ] as UseQueryResult<PopulationCompositionPerYearResponse, Error>[];
    rerender({ queries: updatedQueries });

    expect(result.current.availableCategories).toEqual(["Updated First"]);
    expect(result.current.selectedCategory).toBe("Updated First");
  });
});
