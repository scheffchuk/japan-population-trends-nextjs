export const CardSkeleton = () => {
  return (
    <div className="mt-10 w-3/4 animate-pulse rounded-xl border border-gray-200 bg-white p-4 drop-shadow-xl">
      {/* Skeleton for Category Selector */}
      <div className="mb-6 flex items-center">
        {/* Label Skeleton */}
        <div className="mt-1 mr-2 mb-1 h-8 w-15 rounded">
          <p className="text-sm font-medium">ラベル：</p>
        </div>
        {/* Select Box Skeleton */}
        <div className="h-8 w-26 rounded bg-gray-200"></div>
      </div>

      {/* Skeleton for Chart Area */}
      <div className="flex h-[350px] w-full items-center justify-center rounded-md bg-gray-200"></div>
    </div>
  );
};
