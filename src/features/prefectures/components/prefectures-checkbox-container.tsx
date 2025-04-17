import React, { Suspense } from "react";
import PrefecturesCheckboxSkeleton from "./checkbox-skeleton";
import { getPrefectures } from "../api/get-prefectures";
import PrefecturesCheckbox from "./prefectures-checkbox";

export default async function PrefecturesCheckboxContainer() {
  const prefectures = (await getPrefectures()).result;

  return (
    <Suspense
      fallback={
        <PrefecturesCheckboxSkeleton
          isLoading={true}
          isError={false}
          hasData={false}
        />
      }
    >
      <PrefecturesCheckbox prefectures={prefectures} />
    </Suspense>
  );
}
