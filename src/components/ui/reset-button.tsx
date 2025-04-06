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
      className="transition-full cursor-pointer rounded-lg px-4 py-2 text-blue-400 drop-shadow-md hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400 dark:hover:bg-gray-800"
    >
      リセット
    </button>
  );
}
