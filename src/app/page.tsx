import DisplayPopulationData from "@/components/display-population-data";
import PrefecturesCheckbox from "@/components/prefectures-checkbox";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <PrefecturesCheckbox />
      <DisplayPopulationData />
    </div>
  );
}
