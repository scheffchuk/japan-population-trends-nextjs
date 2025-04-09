import { useQueries } from "@tanstack/react-query";
import { getPopulationData } from "@/features/population/api/get-population-data";

export const usePopulationQueries = (prefCodes: number[]) => {
  const queries = useQueries({
    queries: prefCodes.map((prefCode) => ({
      queryKey: ["populationData", prefCode],
      queryFn: () => getPopulationData(prefCode),
      staleTime: 60 * 60 * 24,
      gcTime: 60 * 60 * 24,
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);
  const errors = queries.filter((q) => q.isError).map((q) => q.error);

  return { queries, isLoading, errors };
};
