"use client";

import React, { useMemo } from "react";

import useCheckedPrefecturesStore from "@/stores/use-checked-prefectures-store";
import { usePopulationQueries } from "@/hooks/use-population-data-queries";
import { useAvailableCategories } from "@/hooks/use-available-categories";
import { useTransformedPopulationData } from "@/hooks/use-transformed-population-data";
import { useGetPrefectures } from "@/hooks/use-get-prefectures";

import PopulationLineChart from "./population-line-chart";
import { CardSkeleton } from "./ui/card-skeleton";

export const PopulationDataCard = () => {
  const checkedPrefCodesSet = useCheckedPrefecturesStore(
    (state) => state.checkedPrefCodes,
  );

  const selectedPrefCodes = useMemo(
    () => Array.from(checkedPrefCodesSet),
    [checkedPrefCodesSet],
  );

  const { queries, isLoading, errors } =
    usePopulationQueries(selectedPrefCodes);

  const { availableCategories, selectedCategory, setSelectedCategory } =
    useAvailableCategories(queries);

  const chartData = useTransformedPopulationData(
    queries,
    selectedPrefCodes,
    selectedCategory,
  );

  const { nameMapping } = useGetPrefectures();

  const hasChartData = chartData.length > 0;

  return (
    <CardSkeleton isLoading={isLoading} errors={errors} hasData={hasChartData}>
      <div className="mt-10 w-4/5 rounded-xl  bg-white p-4 drop-shadow-xl">
        <div className="mb-6">
          <div className="flex justify-between">
            <span></span>
            <select
              id="category-select"
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded border border-gray-300 bg-white p-1 text-sm text-gray-900 focus:border-gray-400 focus:ring-1 focus:outline-none disabled:opacity-50"
              disabled={!selectedCategory || availableCategories.length === 0}
            >
              {availableCategories.map((label: string) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative h-[350px] w-full">
          {chartData.length > 0 && (
            <PopulationLineChart
              chartData={chartData}
              selectedPrefCodes={selectedPrefCodes}
              prefectureNames={nameMapping}
            />
          )}
        </div>
      </div>
    </CardSkeleton>
  );
};
