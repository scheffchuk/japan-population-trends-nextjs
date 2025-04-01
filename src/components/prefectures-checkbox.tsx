"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useCheckedPrefecturesStore from "@/stores/use-checked-prefectures-store";
import { getPrefectures } from "@/queries/get-prefectures";
import PrefecturesCheckboxSkeleton from "./checkbox-skeleton";

export default function PrefecturesCheckbox() {
  const togglePrefCode = useCheckedPrefecturesStore(
    (state) => state.togglePrefCode,
  );

  const isChecked = useCheckedPrefecturesStore((state) => state.isChecked);

  useCheckedPrefecturesStore((state) => state.checkedPrefCodes);

  const resetChecked = useCheckedPrefecturesStore(
    (state) => state.resetChecked,
  );

  const { data, error, isLoading } = useQuery({
    queryKey: ["prefectures"],
    queryFn: getPrefectures,
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  // TODO: Add a skeleton loader for the states

  const hasData = !!data?.result && data.result.length > 0;

  return (
    <PrefecturesCheckboxSkeleton
      isLoading={isLoading}
      error={error}
      hasData={hasData}
    >
      <div className="flex w-3/4 flex-col items-center justify-center rounded-xl border border-gray-200 bg-white drop-shadow-md">
        <div className="mt-6 mb-2 flex w-full flex-row items-center justify-between px-4">
          <span className="text-semibold text-2xl text-gray-950">都道府県</span>
          <button
            type="button"
            onClick={resetChecked}
            className="transition-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 drop-shadow-md hover:bg-gray-200"
          >
            <span className="text-gray-950">Reset</span>
          </button>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8">
          {data?.result
            ?.slice(0, isExpanded ? data.result.length : 24)
            .map((prefecture) => (
              <div key={prefecture.prefCode} className="m-1 text-gray-950">
                <input
                  type="checkbox"
                  id={`prefecture-${prefecture.prefCode}`}
                  className="mr-1"
                  checked={isChecked(prefecture.prefCode)}
                  onChange={() => togglePrefCode(prefecture.prefCode)}
                />
                <label htmlFor={`prefecture-${prefecture.prefCode}`}>
                  {prefecture.prefName}
                </label>
              </div>
            ))}
        </div>
        <button
          type="button"
          onClick={toggleExpand}
          className="mt-3 mb-4 flex-1 cursor-pointer rounded-lg border border-gray-300 bg-white p-2 text-sm text-gray-900 drop-shadow-md transition-all hover:bg-gray-100"
        >
          {isExpanded ? (
            <span className="items-enter flex flex-row">View Less</span>
          ) : (
            <span className="flex flex-row items-center">View More</span>
          )}
        </button>
      </div>
    </PrefecturesCheckboxSkeleton>
  );
}
