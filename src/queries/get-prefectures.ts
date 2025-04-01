"use server";

import { PrefecturesResponse } from "@/types";

export const getPrefectures = async (): Promise<PrefecturesResponse> => {
  const response = await fetch(
    process.env.API_URL_ENDPOINT + "/api/v1/prefectures",
    {
      headers: {
        "X-API-KEY": process.env.X_API_KEY || "",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch prefectures:" + response.status);
  }
  return response.json() as Promise<PrefecturesResponse>;
};
