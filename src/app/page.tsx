import PopulationDisplayGrid from "@/components/population-display-grid";
import PrefecturesCheckbox from "@/components/prefectures-checkbox";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <PrefecturesCheckbox />
      <PopulationDisplayGrid />
    </div>
  );
}
