import { useMemo } from "react";
import { PopulationCategoryData, TransformedChartData } from "@/types";

export const useTransformedPopulationData = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queries: any[],
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
