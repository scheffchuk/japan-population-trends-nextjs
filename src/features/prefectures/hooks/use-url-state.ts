import useCheckedPrefecturesStore from "@/stores/use-checked-prefectures-store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export const useUrlState = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const checkedPrefCodes = useCheckedPrefecturesStore(
    (state) => state.checkedPrefCodes,
  );
  const initializeFromUrl = useCheckedPrefecturesStore(
    (state) => state.initializeFromUrl,
  );

  const isInitializing = useRef(true);

  useEffect(() => {
    const prefCodesParam = searchParams.get("prefCodes");
    if (prefCodesParam) {
      const prefCodes = prefCodesParam.split(",").map(Number);
      initializeFromUrl(prefCodes);
    }
    isInitializing.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isInitializing.current) return;
    const prefCodesArray = Array.from(checkedPrefCodes);
    const newSearchParams = new URLSearchParams(searchParams);

    if (prefCodesArray.length > 0) {
      newSearchParams.set("prefCodes", prefCodesArray.join(","));
    } else {
      newSearchParams.delete("prefCodes");
    }

    router.replace(`?${newSearchParams.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedPrefCodes]);
};
