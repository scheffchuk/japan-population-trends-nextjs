import { FileX, TriangleAlert } from "lucide-react";

type PrefecturesCheckboxSkeletonProps = {
  isLoading: boolean;
  isError: boolean;
  hasData: boolean;
};

export default function PrefecturesCheckboxSkeleton({
  isLoading,
  isError,
  hasData,
}: PrefecturesCheckboxSkeletonProps) {
  if (isLoading) {
    return (
      <div
        className="flex w-4/5 animate-pulse flex-col items-center justify-center rounded-md bg-white p-6 drop-shadow-md dark:bg-gray-800/50"
        aria-busy="true"
        aria-live="polite"
      >
        {/* Header Skeleton */}
        <div className="mx-3 flex w-full flex-row items-center justify-between">
          <div className="h-7 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>{" "}
          {/* Title Placeholder */}
          <div className="h-7 w-20 rounded-lg bg-gray-200 dark:bg-gray-700"></div>{" "}
          {/* Reset Button Placeholder */}
        </div>

        {/* Separator Line */}
        <div className="dark:bg-opacity-20 my-4 w-full rounded-full bg-gray-200 py-[0.5px] sm:block dark:bg-gray-700"></div>

        {/* Checkbox Grid Skeleton */}
        <div className="grid w-full grid-cols-3 gap-2 md:grid-cols-5 lg:grid-cols-8">
          {Array.from({ length: 24 }).map((_, index) => (
            <div key={index} className="m-2 flex items-center">
              <div className="mr-1 h-4 w-4 rounded-sm bg-gray-200 dark:bg-gray-700"></div>{" "}
              {/* Checkbox Placeholder */}
              <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>{" "}
              {/* Label Placeholder */}
            </div>
          ))}
        </div>
        <div className="dark:bg-opacity-20 my-4 w-full rounded-full bg-gray-200 py-[0.5px] sm:block dark:bg-gray-700"></div>
        {/* View More/Less Button Skeleton */}
        <div className="mt-6 h-8 w-20 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="flex w-4/5 flex-col items-center justify-center rounded-md bg-gray-50 p-6 text-gray-500 drop-shadow-xl dark:bg-gray-800/50">
        <div className="flex flex-row">
          <TriangleAlert className="mr-2" />
          <h2 className="text-xl font-semibold">Error fetching prefectures</h2>
        </div>
      </div>
    );
  }

  // No Data State
  if (!hasData) {
    return (
      <div className="flex w-4/5 flex-col items-center justify-center rounded-md bg-gray-50 p-6 text-gray-500 drop-shadow-xl dark:bg-gray-800/50">
        <div className="flex flex-row">
          <FileX className="mr-2" />
          <h2 className="text-xl font-semibold">No Prefectures Found</h2>
        </div>
      </div>
    );
  }
}
