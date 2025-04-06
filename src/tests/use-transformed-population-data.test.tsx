import { renderHook } from "@testing-library/react";
import { UseQueryResult } from "@tanstack/react-query";
import {
  PopulationCategoryData,
  PopulationCompositionPerYearResponse,
  TransformedChartData,
  PopulationYearData,
} from "@/types";
import { useTransformedPopulationData } from "@/features/population/hooks/use-transformed-population-data";

// Helper to create a successful query result
const createSuccessQuery = (
  categories: PopulationCategoryData[],
): UseQueryResult<PopulationCompositionPerYearResponse, Error> => {
  return {
    isSuccess: true,
    // Minimal required properties for this hook
    data: {
      message: null,
      result: {
        boundaryYear: 2020,
        data: categories,
      },
    },
    // Other properties are not used by our hook so we can stub them out:
    isLoading: false,
    isError: false,
    refetch: async () => ({}) as any,
  } as unknown as UseQueryResult<PopulationCompositionPerYearResponse, Error>;
};

// Helper to create a failed (or non-successful) query result
const createFailedQuery = (): UseQueryResult<
  PopulationCompositionPerYearResponse,
  Error
> => {
  return {
    isSuccess: false,
    data: undefined,
    error: new Error("Query failed"),
    isLoading: false,
    isError: true,
    refetch: async () => ({}) as any,
  } as unknown as UseQueryResult<PopulationCompositionPerYearResponse, Error>;
};

// --- Some test data ---

// Query #1: Two population categories; we’ll use the "Total" and "Youth" categories.
const popCategoryTotal1: PopulationCategoryData = {
  label: "Total",
  data: [
    { year: 2000, value: 1000 },
    { year: 2005, value: 1100 },
  ],
};
const popCategoryYouth1: PopulationCategoryData = {
  label: "Youth",
  data: [
    { year: 2000, value: 200 },
    { year: 2005, value: 210 },
  ],
};

const query1 = createSuccessQuery([popCategoryTotal1, popCategoryYouth1]);

// Query #2: Two population categories; this time "Total" and "Elderly".
const popCategoryTotal2: PopulationCategoryData = {
  label: "Total",
  data: [
    { year: 2000, value: 500 },
    { year: 2005, value: 550 },
    { year: 2010, value: 600 },
  ],
};
const popCategoryElderly2: PopulationCategoryData = {
  label: "Elderly",
  data: [
    { year: 2000, value: 100 },
    { year: 2005, value: 110 },
    { year: 2010, value: 120 },
  ],
};

const query2 = createSuccessQuery([popCategoryTotal2, popCategoryElderly2]);

describe("useTransformedPopulationData", () => {
  it("returns an empty array if selectedCategory is null", () => {
    const selectedPrefCodes = [1];
    const selectedCategory = null;

    const { result } = renderHook(() =>
      useTransformedPopulationData(
        [query1],
        selectedPrefCodes,
        selectedCategory,
      ),
    );

    expect(result.current).toEqual([]);
  });

  it("returns an empty array if the selectedPrefCodes array is empty", () => {
    const selectedPrefCodes: number[] = [];
    const selectedCategory = "Total";

    const { result } = renderHook(() =>
      useTransformedPopulationData(
        [query1],
        selectedPrefCodes,
        selectedCategory,
      ),
    );

    expect(result.current).toEqual([]);
  });

  it("transforms data correctly for a single successful query", () => {
    // The queries array has one element. The corresponding prefecture code is 1.
    const selectedPrefCodes = [1];
    const selectedCategory = "Total";

    const { result } = renderHook(() =>
      useTransformedPopulationData(
        [query1],
        selectedPrefCodes,
        selectedCategory,
      ),
    );

    // For query1, the "Total" category contains:
    //   2000 -> 1000, 2005 -> 1100
    const expected: TransformedChartData[] = [
      { year: 2000, 1: 1000 },
      { year: 2005, 1: 1100 },
    ];
    expect(result.current).toEqual(expected);
  });

  it("transforms and merges data correctly from multiple queries", () => {
    // Two queries correspond to prefecture codes: [1, 2]
    const selectedPrefCodes = [1, 2];
    const selectedCategory = "Total";

    const { result } = renderHook(() =>
      useTransformedPopulationData(
        [query1, query2],
        selectedPrefCodes,
        selectedCategory,
      ),
    );

    // query1 ("Total"): {2000 -> 1000, 2005 -> 1100}
    // query2 ("Total"): {2000 -> 500, 2005 -> 550, 2010 -> 600}
    // Expected merged and sorted results:
    //   2000: { year: 2000, 1: 1000, 2: 500 }
    //   2005: { year: 2005, 1: 1100, 2: 550 }
    //   2010: { year: 2010, 2: 600 }
    const expected: TransformedChartData[] = [
      { year: 2000, 1: 1000, 2: 500 },
      { year: 2005, 1: 1100, 2: 550 },
      { year: 2010, 2: 600 },
    ];
    expect(result.current).toEqual(expected);
  });

  it("skips queries that are not successful", () => {
    // Two queries where the second one fails.
    const selectedPrefCodes = [1, 2];
    const failedQuery = createFailedQuery();

    const { result } = renderHook(() =>
      useTransformedPopulationData(
        [query1, failedQuery],
        selectedPrefCodes,
        "Total",
      ),
    );

    // Only query1 contributes its data
    const expected: TransformedChartData[] = [
      { year: 2000, 1: 1000 },
      { year: 2005, 1: 1100 },
    ];
    expect(result.current).toEqual(expected);
  });

  it("skips queries if the selected category is not found", () => {
    // query1 does not contain a "Elderly" category.
    const selectedPrefCodes = [1];
    const selectedCategory = "Elderly";

    const { result } = renderHook(() =>
      useTransformedPopulationData(
        [query1],
        selectedPrefCodes,
        selectedCategory,
      ),
    );

    expect(result.current).toEqual([]);
  });

  it("returns sorted results by year", () => {
    // Provide unsorted population data in a query.
    const unsortedCategory: PopulationCategoryData = {
      label: "Total",
      data: [
        { year: 2010, value: 1200 },
        { year: 2000, value: 1000 },
        { year: 2005, value: 1100 },
      ],
    };

    const queryUnsorted = createSuccessQuery([unsortedCategory]);
    const selectedPrefCodes = [10]; // Arbitrary code for the unsorted query
    const selectedCategory = "Total";

    const { result } = renderHook(() =>
      useTransformedPopulationData(
        [queryUnsorted],
        selectedPrefCodes,
        selectedCategory,
      ),
    );

    const expected: TransformedChartData[] = [
      { year: 2000, 10: 1000 },
      { year: 2005, 10: 1100 },
      { year: 2010, 10: 1200 },
    ];
    expect(result.current).toEqual(expected);
  });
});
