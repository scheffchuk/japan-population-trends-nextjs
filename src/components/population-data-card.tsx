"use client";

import { getPopulationData } from "@/queries/get-population-data";
import useCheckedPrefecturesStore from "@/stores/use-checked-prefectures-store";
import { PopulationCategoryData } from "@/types";

import { useQueries } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import PopulationLineChart from "./population-line-chart";
import { CardSkeleton } from "./card-skeleton";

export type TransformedChartDataPoint = {
  year: number;
  [prefCode: number]: number; // Keys are prefecture codes, values are population numbers
};

export const PopulationDataCard = () => {
  const checkedPrefCodesSet = useCheckedPrefecturesStore(
    (state) => state.checkedPrefCodes,
  );

  // Memoize array creation
  const selectedPrefCodes = useMemo(
    () => Array.from(checkedPrefCodesSet),
    [checkedPrefCodesSet],
  );

  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState<
    string | null
  >(null);

  // Fetch data for all selected prefectures in parallel
  const prefectureQueries = useQueries({
    queries: selectedPrefCodes.map((prefCode) => ({
      queryKey: ["populationData", prefCode],
      queryFn: () => getPopulationData(prefCode),
      enabled: typeof prefCode === "number" && prefCode > 0,
      staleTime: Infinity,
      gcTime: Infinity,
    })),
  });

  // --- Derived State Calculations (useMemo) ---

  const availableCategories = useMemo(() => {
    const firstSuccessfulQuery = prefectureQueries.find(
      (q) => q.isSuccess && q.data?.result?.data,
    );

    const categories =
      firstSuccessfulQuery?.data?.result?.data.map(
        (cat: PopulationCategoryData) => cat.label,
      ) || [];

    if (categories.length > 0 && !selectedCategoryLabel) {
      const defaultCategory = categories.includes("総人口")
        ? "総人口"
        : categories[0];
      // Use a timeout to avoid triggering state update during render cycle
      // if setting state based on derived data immediately
      setTimeout(() => setSelectedCategoryLabel(defaultCategory), 0);
    }
    return categories;
    // Only depend on the success/data status of queries, not the label itself here
  }, [prefectureQueries]);

  const chartData = useMemo(() => {
    if (!selectedCategoryLabel || selectedPrefCodes.length === 0) {
      return [];
    }

    const transformedMap: Record<number, TransformedChartDataPoint> = {};

    prefectureQueries.forEach((query, index) => {
      // Check for success and presence of data using the specific types
      if (!query.isSuccess || !query.data?.result?.data) return;

      const prefCode = selectedPrefCodes[index];
      // Find the category using the imported type
      const categoryData = query.data.result.data.find(
        (cat: PopulationCategoryData) => cat.label === selectedCategoryLabel,
      );

      if (!categoryData) return;

      // Access year and value using the imported PopulationYearData type
      categoryData.data.forEach(({ year, value }) => {
        if (!transformedMap[year]) {
          transformedMap[year] = { year };
        }
        transformedMap[year][prefCode] = value;
      });
    });

    return Object.values(transformedMap).sort((a, b) => a.year - b.year);
  }, [prefectureQueries, selectedPrefCodes, selectedCategoryLabel]);

  const isLoading = prefectureQueries.some((query) => query.isLoading);
  const errors = prefectureQueries
    .filter((query) => query.isError)
    .map((query) => query.error);

  if (
    (isLoading && !selectedCategoryLabel) ||
    errors.length > 0 ||
    selectedPrefCodes.length === 0
  ) {
    return <CardSkeleton />;
  }

  return (
    <div className="mt-10 w-3/4 rounded-xl border border-gray-300 bg-white p-4 drop-shadow-xl">
      <div className="mb-6">
        <label htmlFor="category-select" className="mr-2 text-sm font-medium">
          ラベル：
        </label>
        <select
          id="category-select"
          value={selectedCategoryLabel || ""}
          onChange={(e) => setSelectedCategoryLabel(e.target.value)}
          className="rounded border border-gray-300 bg-white p-1 text-sm text-gray-900 focus:border-gray-400 focus:ring-1 focus:outline-none disabled:opacity-50"
          disabled={availableCategories.length === 0 || !selectedCategoryLabel}
        >
          {availableCategories.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Chart Area */}
      <div className="relative h-[350px] w-full">
        {chartData.length > 0 && (
          <PopulationLineChart
            chartData={chartData}
            selectedPrefCodes={selectedPrefCodes}
          />
        )}
      </div>
    </div>
  );
};
