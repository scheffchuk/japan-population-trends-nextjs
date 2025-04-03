import { PopulationDataCard } from "@/components/population-data-card";
import PrefecturesCheckbox from "@/components/prefectures-checkbox";

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center">
      <PrefecturesCheckbox />
      <PopulationDataCard />
    </div>
  );
}
