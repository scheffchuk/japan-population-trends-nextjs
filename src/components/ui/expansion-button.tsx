import { ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  isExpanded: boolean;
  toggleExpand: () => void;
};

export default function ExpansionButton({ isExpanded, toggleExpand }: Props) {
  return (
    <button
      type="button"
      onClick={toggleExpand}
      className="my-3 flex-1 cursor-pointer rounded-lg p-2 text-sm text-blue-500"
    >
      {isExpanded ? (
        <span className="items-enter flex flex-row">
          <ChevronUp />
          閉じる
        </span>
      ) : (
        <span className="flex flex-row items-center">
          <ChevronDown />
          もっと
        </span>
      )}
    </button>
  );
}
