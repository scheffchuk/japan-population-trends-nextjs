"use client";

import React from "react";
import DisplayPopulationData from "@/components/population-data-card";
import useCheckedPrefecturesStore from "@/stores/use-checked-prefectures-store";

export default function PopulationDisplayGrid() {
  const checkedCodes = useCheckedPrefecturesStore(
    (state) => state.checkedPrefectureCodes,
  );

  const selectedPrefCodes = Array.from(checkedCodes);

  return (
    <section className="mt-10 flex flex-col items-center justify-center rounded-lg border border-gray-300 bg-white shadow-md lg:w-[40rem]">
      <h2 className="mt-3 mb-3 text-xl font-semibold">Population Data</h2>
      <div className="space-y-6">
        {" "}
        {selectedPrefCodes.length === 0 ? (
          <p className="text-center text-gray-600">
            Select one or more prefectures above to view their population data.
          </p>
        ) : (
          selectedPrefCodes.map((prefCode) => (
            <DisplayPopulationData key={prefCode} prefCode={prefCode} />
          ))
        )}
      </div>
    </section>
  );
}
