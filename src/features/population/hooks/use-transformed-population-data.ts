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
        ({
          year,
          value,
          rate,
        }: {
          year: number;
          value: number;
          rate?: number;
        }) => {
          if (!transformedMap[year]) {
            transformedMap[year] = { year };
          }
          // Use the prefecture code as the key for population value
          transformedMap[year][selectedPrefCodes[index]] = value;

          // Store rate data if available
          if (rate !== undefined) {
            const rateKey = `${selectedPrefCodes[index]}_rate`;
            transformedMap[year][rateKey] = rate;
          }
        },
      );
    });

    return Object.values(transformedMap).sort((a, b) => a.year - b.year);
  }, [queries, selectedPrefCodes, selectedCategory]);
};
