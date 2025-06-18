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
      className="transition-full flex cursor-pointer items-center gap-1 rounded-lg px-4 py-2 text-blue-400 drop-shadow-md hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400 dark:hover:bg-gray-800"
    >
      <RotateCcw className="mr-1 h-5 w-5" />
      リセット
    </button>
  );
}
