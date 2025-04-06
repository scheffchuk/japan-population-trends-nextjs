import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPrefectures } from "@/features/prefectures/api/get-prefectures";

export const useGetPrefectures = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["prefectures"],
    queryFn: getPrefectures,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const nameMapping = useMemo(() => {
    if (data && data.result) {
      return data.result.reduce<Record<number, string>>(
        (acc, { prefCode, prefName }) => {
          acc[prefCode] = prefName;
          return acc;
        },
        {},
      );
    }
    return {};
  }, [data]);

  return { nameMapping, data, isLoading, isError };
};
