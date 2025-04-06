import { useMemo } from "react";
import {
  PopulationCategoryData,
  PopulationCompositionPerYearResponse,
  TransformedChartData,
} from "@/types";
import { UseQueryResult } from "@tanstack/react-query";

export const useTransformedPopulationData = (
  queries: UseQueryResult<PopulationCompositionPerYearResponse, Error>[],
  selectedPrefCodes: number[],
  selectedCategory: string | null,
): TransformedChartData[] => {
  return useMemo(() => {
    if (!selectedCategory || selectedPrefCodes.length === 0) {
      return [];
    }

    const transformedMap: Record<number, TransformedChartData> = {};

    queries.forEach((query, index) => {
      if (!query.isSuccess || !query.data?.result?.data) return;

      const categoryData = query.data.result.data.find(
        (cat: PopulationCategoryData) => cat.label === selectedCategory,
      );
      if (!categoryData) return;

      // Loop over each year's population data.
      categoryData.data.forEach(
        ({ year, value }: { year: number; value: number }) => {
          if (!transformedMap[year]) {
            transformedMap[year] = { year };
          }
          // Use the prefecture code as the key.
          transformedMap[year][selectedPrefCodes[index]] = value;
        },
      );
    });

    return Object.values(transformedMap).sort((a, b) => a.year - b.year);
  }, [queries, selectedPrefCodes, selectedCategory]);
};
