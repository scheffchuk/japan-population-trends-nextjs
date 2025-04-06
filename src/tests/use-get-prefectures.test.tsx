import { renderHook, waitFor } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import { Prefectures, PrefecturesResponse } from "@/types"; // Adjust the import path
import { useGetPrefectures } from "@/features/prefectures/hooks/use-get-prefectures";

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn(),
}));

// Type assertion for the mocked useQuery
const mockedUseQuery = useQuery as jest.Mock;

// Mock data that matches the expected PrefecturesResponse structure
const mockPrefectureData: Prefectures[] = [
  { prefCode: 1, prefName: "Hokkaido" },
  { prefCode: 2, prefName: "Aomori" },
  { prefCode: 13, prefName: "Tokyo" },
];

const mockSuccessResponse: PrefecturesResponse = {
  message: null,
  result: mockPrefectureData,
};

describe("useGetPrefectures", () => {
  // Reset mocks before each test
  beforeEach(() => {
    mockedUseQuery.mockClear();
  });

  it("should return loading state initially", () => {
    // Arrange: Configure useQuery mock for loading state
    mockedUseQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    });

    // Act: Render the hook
    const { result } = renderHook(() => useGetPrefectures());

    // Assert: Check initial state
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(result.current.nameMapping).toEqual({}); // nameMapping is empty while loading
  });

  it("should return data and correctly calculated nameMapping on success", async () => {
    // Arrange: Configure useQuery mock for success state
    mockedUseQuery.mockReturnValue({
      data: mockSuccessResponse,
      isLoading: false,
      isError: false,
      error: null,
    });

    // Act: Render the hook
    const { result } = renderHook(() => useGetPrefectures());

    // Assert: Check state after successful fetch
    // Use waitFor if there's potential async update within the hook, though useMemo here is sync
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(false);
    expect(result.current.data).toEqual(mockSuccessResponse);
    expect(result.current.nameMapping).toEqual({
      1: "Hokkaido",
      2: "Aomori",
      13: "Tokyo",
    });
  });

  it("should return error state when query fails", async () => {
    // Arrange: Configure useQuery mock for error state
    const mockError = new Error("Failed to fetch prefectures");
    mockedUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: mockError,
    });

    // Act: Render the hook
    const { result } = renderHook(() => useGetPrefectures());

    // Assert: Check error state
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(true);
    // Optionally check the specific error object if needed
    // expect(result.current.error).toBe(mockError); // Depends if you expose error from your hook
    expect(result.current.data).toBeUndefined();
    expect(result.current.nameMapping).toEqual({}); // nameMapping is empty on error
  });

  it("should return an empty nameMapping if data.result is null or empty", async () => {
    // Arrange: Configure useQuery mock for success state but with empty result
    mockedUseQuery.mockReturnValue({
      data: { message: null, result: [] }, // Empty result array
      isLoading: false,
      isError: false,
      error: null,
    });

    // Act: Render the hook
    const { result } = renderHook(() => useGetPrefectures());

    // Assert: Check state
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(false);
    expect(result.current.data).toEqual({ message: null, result: [] });
    expect(result.current.nameMapping).toEqual({}); // nameMapping is empty
  });

  it("should return an empty nameMapping if data is undefined", async () => {
    // Arrange: Configure useQuery mock where data remains undefined after loading
    mockedUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false, // Finished loading, but no data
      isError: false,
      error: null,
    });

    // Act: Render the hook
    const { result } = renderHook(() => useGetPrefectures());

    // Assert: Check state
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(result.current.nameMapping).toEqual({}); // nameMapping is empty
  });
});
