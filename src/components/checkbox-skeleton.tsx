type PrefecturesCheckboxSkeletonProps = {
  isLoading: boolean;
  error: Error | null;
  hasData: boolean;
  children: React.ReactNode;
};

export default function PrefecturesCheckboxSkeleton({
  isLoading,
  hasData,
  children,
}: PrefecturesCheckboxSkeletonProps) {
  if (isLoading) {
    return (
      <div
        className="flex w-3/4 animate-pulse flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-6 drop-shadow-xl"
        aria-busy="true"
        aria-live="polite"
      >
        {/* Header Skeleton */}
        <div className="flex w-full flex-row items-center justify-between">
          <div className="h-7 w-24 rounded bg-gray-200"></div>{" "}
          {/* Title Placeholder */}
          <div className="h-7 w-20 rounded-lg bg-gray-200"></div>{" "}
          {/* Reset Button Placeholder */}
        </div>

        {/* Checkbox Grid Skeleton */}
        <div className="mt-4 grid w-full grid-cols-3 gap-2 md:grid-cols-5 lg:grid-cols-8">
          {Array.from({ length: 24 }).map((_, index) => (
            <div key={index} className="m-1 flex items-center">
              <div className="mr-1 h-4 w-4 rounded-sm bg-gray-200"></div>{" "}
              {/* Checkbox Placeholder */}
              <div className="h-4 w-16 rounded bg-gray-200"></div>{" "}
              {/* Label Placeholder */}
            </div>
          ))}
        </div>

        {/* View More/Less Button Skeleton */}
        <div className="mt-6 h-8 w-20 rounded-lg bg-gray-200"></div>
      </div>
    );
  }

  //No Data State
  if (!hasData) {
    return (
      <div className="flex w-3/4 flex-col items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-6 text-gray-500 drop-shadow-xl">
        <h2 className="text-xl font-semibold">No Prefectures Found</h2>
        <p className="mt-2">Could not retrieve prefecture data.</p>
      </div>
    );
  }

  //Data Loaded State
  // If not loading, not error, and has data, render the actual component
  return <>{children}</>;
}
