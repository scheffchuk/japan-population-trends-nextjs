"use client";

import React, { useMemo } from "react";

import useCheckedPrefecturesStore from "@/stores/use-checked-prefectures-store";
import useExpandedStore from "@/stores/use-checkbox-expansion";
import { useGetPrefectures } from "@/hooks/use-get-prefectures";

import PrefecturesCheckboxSkeleton from "./ui/checkbox-skeleton";
import ExpansionButton from "./ui/expansion-button";
import ResetButton from "./ui/reset-button";

export default function PrefecturesCheckbox() {
  const checkedPrefCodes = useCheckedPrefecturesStore(
    (state) => state.checkedPrefCodes,
  );

  const resetChecked = useCheckedPrefecturesStore(
    (state) => state.resetChecked,
  );

  const togglePrefCode = useCheckedPrefecturesStore(
    (state) => state.togglePrefCode,
  );

  const isChecked = useCheckedPrefecturesStore((state) => state.isChecked);

  const { isExpanded, toggleExpand } = useExpandedStore(); // Would it be a global state?

  const { data, isLoading, isError } = useGetPrefectures();

  const isResetDisabled = useMemo(
    () => checkedPrefCodes.size === 0,
    [checkedPrefCodes],
  );

  const hasData = !!data?.result && data.result.length > 0;

  return (
    <PrefecturesCheckboxSkeleton
      isLoading={isLoading}
      isError={isError}
      hasData={hasData}
    >
      <div className="flex w-4/5 flex-col items-center justify-center rounded-md bg-white drop-shadow-md dark:bg-gray-800/50">
        <div className="my-3 flex w-full flex-row items-center justify-between px-4">
          <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
            都道府県
          </span>
          <ResetButton onReset={resetChecked} isDisabled={isResetDisabled} />
        </div>
        <div className="dark:bg-opacity-20 w-[95%] rounded-full bg-gray-200 py-[0.5px] sm:block dark:bg-gray-700"></div>
        <div className="grid grid-cols-3 py-8 md:grid-cols-5 lg:grid-cols-8">
          {data?.result
            ?.slice(
              0,
              isExpanded ? data.result.length : data.result.length / 2 + 1,
            )
            .map((prefecture) => (
              <div
                key={prefecture.prefCode}
                className="m-2 font-semibold text-gray-800 dark:text-gray-50/80"
              >
                <input
                  type="checkbox"
                  id={`prefecture-${prefecture.prefCode}`}
                  className="mr-1"
                  checked={isChecked(prefecture.prefCode)}
                  onChange={() => togglePrefCode(prefecture.prefCode)}
                />
                {prefecture.prefName}
              </div>
            ))}
        </div>
        <div className="dark:bg-opacity-20 w-[95%] rounded-full bg-gray-200 py-[0.5px] sm:block dark:bg-gray-700"></div>

        <ExpansionButton isExpanded={isExpanded} toggleExpand={toggleExpand} />
      </div>
    </PrefecturesCheckboxSkeleton>
  );
}
