"use server";

import { PrefecturesResponse } from "@/types";

export const getPrefectures = async (): Promise<PrefecturesResponse> => {
  try {
    const response = await fetch(
      `${process.env.API_URL_ENDPOINT}/api/v1/prefectures`,
      {
        headers: {
          "X-API-KEY": process.env.X_API_KEY!,
        },
        next: {
          revalidate: 60 * 60 * 24, // 24 hours
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch prefectures");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in getPrefectures:", error);
    throw error;
  }
};
