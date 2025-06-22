import { RotateCcw } from "lucide-react";

type Props = {
  onReset: () => void;
  isDisabled: boolean;
};

export default function ResetButton({ onReset, isDisabled }: Props) {
  return (
    <button
      type="button"
      onClick={onReset}
      disabled={isDisabled}
      className="transition-full flex cursor-pointer items-center gap-1 rounded-lg border border-gray-300 px-4 py-2 text-sm text-blue-400 hover:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-400 dark:hover:bg-gray-800"
    >
      <RotateCcw className="h-5 w-5" />
      <span className="hidden text-sm md:block">リセット</span>
    </button>
  );
}
