"use client";

import { getPrefectures } from "@/queries/get-prefectures";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function DisplayPrefectures() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["prefectures"],
    queryFn: getPrefectures,
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
    <div className="flex flex-wrap p-8">
      {data.result.map((prefecture) => (
        <div key={prefecture.prefCode} className="m-2">
          <p className="text-gray-500">{prefecture.prefCode}</p>
          <h2 className="text-2xl font-bold">{prefecture.prefName}</h2>
        </div>
      ))}
    </div>
  );
}
