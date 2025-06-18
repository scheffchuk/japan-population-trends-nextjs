"use client";

import React, { useMemo } from "react";

import useCheckedPrefecturesStore from "@/stores/use-checked-prefectures-store";
import useExpandedStore from "@/stores/use-checkbox-expansion";
import ResetButton from "@/components/ui/reset-button";
import ExpansionButton from "@/components/ui/expansion-button";
import { Prefectures } from "@/types";
import { MapPin } from "lucide-react";

type Props = {
  prefectures: Prefectures[];
};

export default function PrefecturesCheckbox({ prefectures }: Props) {
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

  const { isExpanded, toggleExpand } = useExpandedStore();

  const isResetDisabled = useMemo(
    () => checkedPrefCodes.size === 0,
    [checkedPrefCodes],
  );

  return (
    <div className="flex w-10/12 flex-col items-center justify-center rounded-md bg-white/90 drop-shadow-md dark:bg-gray-800/50">
      <div className="mt-6 mb-3 flex w-full flex-row items-center justify-between px-4">
        <span className="flex items-center gap-2 text-xl font-bold text-gray-800 dark:text-gray-200">
          <MapPin className="h-5 w-5 text-blue-600" />
          都道府県選択
        </span>
        <ResetButton onReset={resetChecked} isDisabled={isResetDisabled} />
      </div>
      {/* This can be refactored into a Divider component */}
      <div className="dark:bg-opacity-20 w-[95%] rounded-full bg-gray-200 py-[0.5px] sm:block dark:bg-gray-700"></div>
      <div className="grid grid-cols-3 py-8 md:grid-cols-5 lg:grid-cols-8">
        {prefectures
          ?.slice(
            0,
            isExpanded ? prefectures.length : Math.ceil(prefectures.length / 2),
          )
          .map((prefecture) => (
            <div
              key={prefecture.prefCode}
              className="m-2 font-medium text-gray-800 dark:text-gray-50/80"
            >
              <label className="flex items-center hover:cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-1 hover:cursor-pointer"
                  checked={isChecked(prefecture.prefCode)}
                  onChange={() => togglePrefCode(prefecture.prefCode)}
                />
                {prefecture.prefName}
              </label>
            </div>
          ))}
      </div>
      <div className="dark:bg-opacity-20 w-[95%] rounded-full bg-gray-200 py-[0.5px] sm:block dark:bg-gray-700"></div>
      <ExpansionButton isExpanded={isExpanded} toggleExpand={toggleExpand} />
    </div>
  );
}
