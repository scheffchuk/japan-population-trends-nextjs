import { useMemo, useState, useEffect } from "react";
import { PopulationCategoryData } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAvailableCategories = (queries: any[]) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const availableCategories = useMemo(() => {
    const firstSuccessfulQuery = queries.find(
      (query) => query.isSuccess && query.data?.result?.data?.length > 0,
    );
    return (
      firstSuccessfulQuery?.data?.result?.data.map(
        (cat: PopulationCategoryData) => cat.label,
      ) || []
    );
  }, [queries]);

  useEffect(() => {
    const hasAvailableCategories = availableCategories.length > 0;

    if (hasAvailableCategories) {
      // Case 1: No category selected yet, set the default (first available)
      if (selectedCategory === null) {
        setSelectedCategory(availableCategories[0]);
      }
      // Case 2: A category is selected, but it's no longer in the available list
      else if (!availableCategories.includes(selectedCategory)) {
        setSelectedCategory(availableCategories[0]);
      }
      // Case 3: Selection is valid and exists, do nothing
    } else {
      // Case 4: No categories available, ensure nothing is selected
      if (selectedCategory !== null) {
        setSelectedCategory(null);
      }
    }
    // Ensure all dependencies that influence the logic are included
  }, [availableCategories, selectedCategory]);

  return { availableCategories, selectedCategory, setSelectedCategory };
};
