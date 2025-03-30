"use client";

import { getPrefectures } from "@/queries/get-prefectures";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useCheckedPrefecturesStore from "@/stores/use-checked-prefectures-store";

export default function PrefecturesCheckbox() {
  const togglePrefectureCode = useCheckedPrefecturesStore(
    (state) => state.togglePrefectureCode,
  );

  const isChecked = useCheckedPrefecturesStore((state) => state.isChecked);

  useCheckedPrefecturesStore((state) => state.checkedPrefectureCodes);

  const { data, error, isLoading } = useQuery({
    queryKey: ["prefectures"],
    queryFn: getPrefectures,
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  // TODO: Add a skeleton loader for the states

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }
  if (!data) {
    return <div>No data found.</div>;
  }

  return (
    <div className="mt-10 flex flex-col items-center justify-center rounded-lg border border-gray-300 bg-white shadow-md lg:w-[40rem]">
      <span className="mt-8 text-2xl text-semibold">都道府県</span>
      <div className="grid grid-cols-3 p-4 lg:grid-cols-6">
        {data.result
          .slice(0, isExpanded ? data.result.length : 24)
          .map((prefecture) => (
            <div key={prefecture.prefCode} className="m-2">
              <input
                type="checkbox"
                id={`prefecture-${prefecture.prefCode}`}
                className="mr-2"
                checked={isChecked(prefecture.prefCode)}
                onChange={() => togglePrefectureCode(prefecture.prefCode)}
              />
              <label htmlFor={`prefecture-${prefecture.prefCode}`}>
                {prefecture.prefName}
              </label>
            </div>
          ))}
      </div>
      <button type="button" onClick={toggleExpand} className="m-4 flex-1">
        {isExpanded ? (
          <span className="items-enter flex flex-row">View Less</span>
        ) : (
          <span className="flex flex-row items-center">View More</span>
        )}
      </button>
    </div>
  );
}
