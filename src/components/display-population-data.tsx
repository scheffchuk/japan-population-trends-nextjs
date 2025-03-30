"use client";

import { getPopulationData } from "@/queries/get-population-data";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function DisplayPopulationData() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["populationData", 13],
    queryFn: () => getPopulationData(13),
  });

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
    <div className="flex flex-col space-y-4 p-8">
      <div>
        <strong>Boundary Year:</strong> {data.result.boundaryYear}
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-bold">Population Data by Category:</h2>
        {data.result.data.map((category) => (
          <div key={category.label} className="border-t pt-3">
            <h3 className="text-lg font-semibold">{category.label}</h3>
            <ul className="mt-1 ml-4 list-inside list-disc text-sm">
              {category.data.map((yearData) => (
                <li key={yearData.year}>
                  {yearData.year}: Value = {yearData.value.toLocaleString()}
                  {yearData.rate !== undefined
                    ? `, Rate = ${yearData.rate}%`
                    : ""}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
