import { renderHook, waitFor } from "@testing-library/react";
import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { PopulationCompositionPerYearResponse } from "@/types"; // Adjust import path if needed for mock data type
import { usePopulationQueries } from "@/hooks/use-population-data-queries";

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQueries: jest.fn(), // Mock useQueries specifically
}));

// Type assertion for the mocked useQueries
const mockedUseQueries = useQueries as jest.Mock;

// Helper type for individual query results (adjust based on getPopulationData's actual return type)
type MockPopulationQueryResult = Partial<
  UseQueryResult<PopulationCompositionPerYearResponse, Error>
>; // Assuming getPopulationData returns PopulationCompositionPerYearResponse

// Example Mock Data (adjust structure as needed)
const mockPopulationData1: PopulationCompositionPerYearResponse = {
  message: null,
  result: { boundaryYear: 2020, data: [{ label: "Total", data: [] }] },
};
const mockPopulationData2: PopulationCompositionPerYearResponse = {
  message: null,
  result: { boundaryYear: 2020, data: [{ label: "Total", data: [] }] },
};
const mockError1 = new Error("Failed to fetch data for pref 1");
const mockError2 = new Error("Failed to fetch data for pref 2");

describe("usePopulationQueries", () => {
  // Reset mocks before each test
  beforeEach(() => {
    mockedUseQueries.mockClear();
  });

  it("should return loading state when any query is loading", () => {
    // Arrange: Configure useQueries mock for loading states
    const inputPrefCodes = [1, 2];
    const mockResults: MockPopulationQueryResult[] = [
      { isLoading: true, isError: false, data: undefined, error: null },
      { isLoading: true, isError: false, data: undefined, error: null },
    ];
    mockedUseQueries.mockReturnValue(mockResults);

    // Act: Render the hook
    const { result } = renderHook(() => usePopulationQueries(inputPrefCodes));

    // Assert: Check loading state and empty errors
    expect(result.current.isLoading).toBe(true);
    expect(result.current.errors).toEqual([]);
    expect(result.current.queries).toEqual(mockResults);
    // Check if useQueries was called correctly
    expect(mockedUseQueries).toHaveBeenCalledWith({
      queries: expect.arrayContaining([
        expect.objectContaining({ queryKey: ["populationData", 1] }),
        expect.objectContaining({ queryKey: ["populationData", 2] }),
      ]),
    });
  });

  it("should return loading state if only one query is loading", () => {
    // Arrange: Configure useQueries mock for mixed states
    const inputPrefCodes = [1, 2];
    const mockResults: MockPopulationQueryResult[] = [
      {
        isLoading: false,
        isError: false,
        data: mockPopulationData1,
        error: null,
      },
      { isLoading: true, isError: false, data: undefined, error: null }, // This one is loading
    ];
    mockedUseQueries.mockReturnValue(mockResults);

    // Act: Render the hook
    const { result } = renderHook(() => usePopulationQueries(inputPrefCodes));

    // Assert: isLoading should still be true
    expect(result.current.isLoading).toBe(true);
    expect(result.current.errors).toEqual([]);
    expect(result.current.queries).toEqual(mockResults);
  });

  it("should return success state and empty errors when all queries succeed", async () => {
    // Arrange: Configure useQueries mock for success states
    const inputPrefCodes = [1, 2];
    const mockResults: MockPopulationQueryResult[] = [
      {
        isLoading: false,
        isError: false,
        data: mockPopulationData1,
        error: null,
      },
      {
        isLoading: false,
        isError: false,
        data: mockPopulationData2,
        error: null,
      },
    ];
    mockedUseQueries.mockReturnValue(mockResults);

    // Act: Render the hook
    const { result } = renderHook(() => usePopulationQueries(inputPrefCodes));

    // Assert: Check success state
    // Use waitFor to ensure state updates based on async results propagate
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.errors).toEqual([]);
    expect(result.current.queries).toEqual(mockResults);
  });

  it("should return combined errors when some queries fail", async () => {
    // Arrange: Configure useQueries mock for mixed success/error states
    const inputPrefCodes = [1, 2, 3];
    const mockResults: MockPopulationQueryResult[] = [
      { isLoading: false, isError: true, data: undefined, error: mockError1 }, // Failed
      {
        isLoading: false,
        isError: false,
        data: mockPopulationData2,
        error: null,
      }, // Succeeded
      { isLoading: false, isError: true, data: undefined, error: mockError2 }, // Failed
    ];
    mockedUseQueries.mockReturnValue(mockResults);

    // Act: Render the hook
    const { result } = renderHook(() => usePopulationQueries(inputPrefCodes));

    // Assert: Check state with errors
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.errors).toEqual([mockError1, mockError2]); // Contains only the errors
    expect(result.current.queries).toEqual(mockResults); // Contains the full results
  });

  it("should return all errors when all queries fail", async () => {
    // Arrange: Configure useQueries mock for all error states
    const inputPrefCodes = [1, 2];
    const mockResults: MockPopulationQueryResult[] = [
      { isLoading: false, isError: true, data: undefined, error: mockError1 },
      { isLoading: false, isError: true, data: undefined, error: mockError2 },
    ];
    mockedUseQueries.mockReturnValue(mockResults);

    // Act: Render the hook
    const { result } = renderHook(() => usePopulationQueries(inputPrefCodes));

    // Assert: Check all error state
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.errors).toEqual([mockError1, mockError2]);
    expect(result.current.queries).toEqual(mockResults);
  });

  it("should return empty results when prefCodes array is empty", () => {
    // Arrange: Configure useQueries mock for empty input
    const inputPrefCodes: number[] = [];
    const mockResults: MockPopulationQueryResult[] = []; // useQueries returns empty array for empty input
    mockedUseQueries.mockReturnValue(mockResults);

    // Act: Render the hook
    const { result } = renderHook(() => usePopulationQueries(inputPrefCodes));

    // Assert: Check for empty results
    expect(result.current.isLoading).toBe(false); // .some() on empty array is false
    expect(result.current.errors).toEqual([]);
    expect(result.current.queries).toEqual([]);
    expect(mockedUseQueries).toHaveBeenCalledWith({ queries: [] }); // Ensure it was called with empty queries array
  });
});
