import { Github, TrendingUp } from "lucide-react";

export default function Header() {
  return (
    <header className="my-10 flex w-full justify-center pt-10 text-2xl font-semibold">
      <h1 className="relative flex flex-row items-center gap-2 text-slate-800 dark:text-gray-200">
        <TrendingUp className="h-8 w-8 text-blue-600" />
        日本の人口推移チャート
      </h1>
      <a
        href="https://github.com/scheffchuk/japan-population-trends-nextjs"
        className="absolute top-10 right-25 hidden text-gray-700 md:block"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github size={28} />
      </a>
    </header>
  );
}
