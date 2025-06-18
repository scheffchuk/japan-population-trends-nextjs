import { TrendingUp } from "lucide-react";

export default function Header() {
  return (
    <header className="my-10 flex w-full justify-center pt-10 text-2xl font-semibold">
      <h1 className="flex flex-row items-center gap-2 text-slate-800 dark:text-gray-200">
        <TrendingUp className="h-8 w-8 text-blue-600" />
        日本都道府県別の人口推移
      </h1>
    </header>
  );
}
