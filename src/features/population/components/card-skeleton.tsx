import { Loader2 } from "lucide-react";

type CardSkeletonProps = {
  isLoading: boolean;
  hasData: boolean;
  errors?: Error[];
  children: React.ReactNode;
};

export const CardSkeleton = ({
  isLoading,
  errors,
  hasData,
  children,
}: CardSkeletonProps) => {
  if (isLoading) {
    return (
      <div
        className="mt-10 w-10/12 animate-pulse rounded-md border border-gray-200 bg-white p-4 px-4 drop-shadow-xl"
        aria-busy="true"
        aria-live="polite"
      >
        <div className="mb-6 flex flex-row items-center justify-between">
          <div></div>
          <div className="h-6 w-24 rounded bg-gray-200"></div>
        </div>
        <div className="flex h-[350px] w-full items-center justify-center rounded-md bg-gray-200">
          <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
        </div>
      </div>
    );
  }

  // --- Error State ---
  const hasErrors = errors && errors.length > 0;
  if (hasErrors) {
    return (
      <div className="mt-10 flex h-auto min-h-[400px] w-10/12 flex-col items-center justify-center rounded-md border border-red-200 bg-red-50 p-6 text-red-700 drop-shadow-xl">
        <h2 className="text-xl font-semibold">Error Occurred</h2>
        <div className="mt-2 text-left">
          {errors.map((err, index) => (
            <p key={index} className="mb-1">
              - {err.message || "An unspecified error occurred."}
            </p>
          ))}
        </div>
      </div>
    );
  }

  // --- No Data State ---
  if (!hasData) {
    return (
      <div className="mt-10 flex h-[430px] w-10/12 flex-col items-center justify-center rounded-md bg-gray-50 p-6 text-gray-500 drop-shadow-xl dark:bg-gray-800/50">
        <h2 className="text-xl font-semibold">No Data</h2>
        <p className="mt-2 text-center">地域を選んでください</p>
      </div>
    );
  }

  // --- Data Loaded State ---
  return <>{children}</>;
};
